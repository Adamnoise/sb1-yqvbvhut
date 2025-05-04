import React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
	Controller,
	ControllerProps,
	FieldError,
	FieldPath,
	FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form";

// --- Type Definitions ---

/**
 * Context value for the form field.
 * Contains the name of the field.
 * ---
 * Az űrlap mező kontextusának értéke.
 * Tartalmazza a mező nevét.
 */
type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

/**
 * Context value for the form item.
 * Contains the unique ID of the item.
 * ---
 * Az űrlap elem (item) kontextusának értéke.
 * Tartalmazza az elem egyedi azonosítóját.
 */
type FormItemContextValue = {
	id: string;
};

// --- Contexts ---

/**
 * Context for sharing the form field name.
 * Defaults to `null`, checked within the hook.
 * ---
 * Kontextus az űrlap mező nevének megosztására.
 * `null` alapértelmezett értékkel, a hookban ellenőrizzük.
 */
const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

/**
 * Context for sharing the form item's unique ID.
 * Defaults to `null`, checked within the hook.
 * ---
 * Kontextus az űrlap elem egyedi azonosítójának megosztására.
 * `null` alapértelmezett értékkel, a hookban ellenőrizzük.
 */
const FormItemContext = React.createContext<FormItemContextValue | null>(null);

// --- Hook ---

// Define an interface for the hook's return value for better type safety and clarity
interface UseFormFieldResult {
	/** The unique ID for the input element (passed to FormControl's child). */
	id: string;
	/** The name of the form field. */
	name: FieldPath<FieldValues>; // Use base FieldPath here, specific type comes from usage
	/** The unique ID for the entire FormItem wrapper div. */
	formItemId: string;
	/** The unique ID for the FormDescription component. */
	formDescriptionId: string;
	/** The unique ID for the FormMessage component. */
	formMessageId: string;
	/** React Hook Form field state (error, invalid, isTouched, isDirty, etc.). */
	invalid: boolean;
	isTouched: boolean;
	isDirty: boolean;
	error?: FieldError;
}

/**
 * Custom hook to retrieve form field information and state.
 * Must be used within `<FormItem>` and `<FormField>` components.
 * It connects the RHF state with the accessibility props.
 * ---
 * Egyéni hook az űrlap mezővel kapcsolatos információk és állapot lekérdezésére.
 * Használata szigorúan <FormItem> és <FormField> komponenseken belül kötelező.
 * Összeköti a RHF állapotot az akadálymentességi propokkal.
 */
export const useFormField = (): UseFormFieldResult => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	// useFormContext retrieves the form state.
	// It relies on a <FormProvider> wrapping the form.
	// ---
	// A useFormContext a mező állapotának lekérdezésére szolgál.
	// Feltételezi a FormProvider meglétét a fa fölött.
	const { getFieldState, formState } = useFormContext();

	// Strict checks for context availability provide clear developer feedback.
	// ---
	// Szigorú ellenőrzések a kontextusok meglétére a fejlesztői hibák elkerülése érdekében.
	if (!fieldContext) {
		throw new Error("useFormField must be used within a <FormField>");
	}
	// The `name` prop is mandatory for FormField, ensuring context value is set.
	// ---
	// A 'name' prop kötelező a FormField komponensen, így a kontextus értéke biztosított.

	if (!itemContext) {
		throw new Error("useFormField must be used within a <FormItem>");
	}
	// The `id` is guaranteed by FormItem context provider.
	// ---
	// Az 'id'-t garantálja a FormItem kontextus szolgáltatója.

	const fieldState = getFieldState(fieldContext.name, formState);
	const { id } = itemContext;

	return {
		id, // ID for the actual input control (used by FormControl child)
		name: fieldContext.name, // Field name
		formItemId: `${id}-form-item`, // ID for the wrapper div
		formDescriptionId: `${id}-form-item-description`, // ID for description paragraph
		formMessageId: `${id}-form-item-message`, // ID for message paragraph
		...fieldState, // Spread RHF field state (error, invalid, isTouched, isDirty)
	};
};

// --- Components ---

/**
 * `FormField` component:
 * Connects React Hook Form's `Controller` with the field context.
 * Provides `FormFieldContext` with the field `name`.
 * ---
 * `FormField` komponens:
 * Összeköti a React Hook Form `Controller`-t a mező kontextusával.
 * Biztosítja a `FormFieldContext`-et a `name` proppal.
 */
export const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props // ControllerProps<TFieldValues, TName> - 'name' is mandatory
}: ControllerProps<TFieldValues, TName>): JSX.Element => {
	// useMemo ensures the context value object identity stability if name doesn't change.
	// ---
	// A useMemo biztosítja a kontextus érték objektumának stabilitását, ha a 'name' nem változik.
	const contextValue = React.useMemo(() => ({ name: props.name }), [props.name]);

	return (
		<FormFieldContext.Provider value={contextValue}>
			{/* Controller handles RHF field registration and state updates */}
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};
// No displayName needed for generic functional components like FormField.

/**
 * `FormItem` component:
 * Provides logical grouping for form elements (label, input, message).
 * Generates a unique ID and provides `FormItemContext`.
 * ---
 * `FormItem` komponens:
 * Logikai csoport egy űrlap elem köré (pl. label, input, message).
 * Generálja az egyedi ID-t és biztosítja a `FormItemContext`-et.
 */
export const FormItem = React.forwardRef<
	HTMLDivElement, // Ref is for the wrapping div element
	React.HTMLAttributes<HTMLDivElement> // Standard div attributes
>(({ className, ...props }, ref): JSX.Element => {
	// Generate a unique ID for this form item instance.
	// ---
	// Egyedi ID generálása ehhez a form item példányhoz.
	const id = React.useId();

	// useMemo for context value stability.
	// ---
	// useMemo a kontextus értékének stabilitásáért.
	const contextValue = React.useMemo(() => ({ id }), [id]);

	return (
		<FormItemContext.Provider value={contextValue}>
			{/* The div acts as the container and receives the generated ID */}
			{/* A div a konténer, és megkapja a generált ID-t */}
			<div
				ref={ref}
				className={className}
				{...props}
				// The ID structure matches the one generated in useFormField for `formItemId`
				// Az ID struktúra megegyezik a useFormField által generált `formItemId`-val
				id={`${id}-form-item`}
			/>
			{/* Children are implicitly passed via props */}
		</FormItemContext.Provider>
	);
});
FormItem.displayName = "FormItem";

/**
 * `FormLabel` component:
 * Displays the field label, automatically associated with the input control via `htmlFor`.
 * ---
 * `FormLabel` komponens:
 * Megjeleníti a mező címkéjét, automatikusan összekapcsolva a `FormControl`-ban lévő inputtal (`htmlFor`).
 */
export const FormLabel = React.forwardRef<
	HTMLLabelElement, // Ref is for the label element
	React.LabelHTMLAttributes<HTMLLabelElement> // Standard label attributes
>(({ className, ...props }, ref): JSX.Element => {
	const { error, id } = useFormField(); // Get the input ID for htmlFor

	return (
		<label
			ref={ref}
			className={className}
			htmlFor={id} // Associates label with the input control (via FormControl's child)
			// data-invalid is useful for styling based on error state
			data-invalid={error ? true : undefined}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

/**
 * `FormControl` component:
 * A wrapper around the actual input control (e.g., <input>, <select>).
 * Uses `@radix-ui/react-slot` to pass props directly to the immediate child component.
 * Sets accessibility attributes (`id`, `aria-describedby`, `aria-invalid`).
 * ---
 * `FormControl` komponens:
 * Wrapper a beviteli vezérlő (pl. <input>, <select>) köré.
 * A `@radix-ui/react-slot` segítségével közvetlenül a gyermek komponensre adja át a prop-okat.
 * Beállítja az akadálymentességi attribútumokat (`id`, `aria-describedby`, `aria-invalid`).
 */
export const FormControl = React.forwardRef<
	// Ref type is for the Slot component itself. Slot forwards the ref to its child.
	// ---
	// A ref típusa magára a Slot komponensre vonatkozik. A Slot továbbítja a ref-et a gyermekének.
	React.ElementRef<typeof Slot>,
	// Props are for the Slot component (which merges them onto its child).
	// ---
	// A propok a Slot komponenshez tartoznak (amelyek összevonja őket a gyermekével).
	React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref): JSX.Element => {
	const { error, id, formDescriptionId, formMessageId } = useFormField();

	// Collect IDs of elements describing the input (description, error message)
	// ---
	// Összegyűjtjük azon elemek ID-jait, amelyek leírják a mezőt (leírás, hibaüzenet)
	const describedBy = [
		formDescriptionId, // ID of FormDescription (if present)
		error ? formMessageId : undefined, // ID of FormMessage (only if error exists)
	]
		.filter(Boolean) // Remove empty or undefined values
		.join(" "); // Convert to a space-separated string

	return (
		// Slot clones its child and merges props.
		// ---
		// A Slot klónozza a gyermekét és összevonja a propokat.
		<Slot
			ref={ref} // The ref is forwarded to the actual input element (Slot's child)
			id={id} // This ID is received by the Slot's child (e.g., <input>)
			// aria-describedby links the input to its description and error message
			aria-describedby={describedBy || undefined} // Set only if there are describing elements
			// aria-invalid indicates the field's validity state to assistive technologies
			aria-invalid={error ? true : undefined} // Use true/undefined for boolean aria attributes
			{...props} // Spread remaining props onto the Slot's child
		/>
	);
});
FormControl.displayName = "FormControl";

/**
 * `FormDescription` component:
 * Displays optional helper text or description for the field.
 * Renders only if it has `children`.
 * Its `id` is automatically added to the `FormControl`'s `aria-describedby`.
 * ---
 * `FormDescription` komponens:
 * Opcionális leírást vagy segítő szöveget jelenít meg a mezőhöz.
 * Csak akkor renderelődik, ha van `children` tartalma.
 * Az `id`-ja automatikusan hozzáadódik a `FormControl` `aria-describedby` attribútumához.
 */
export const FormDescription = React.forwardRef<
	HTMLParagraphElement, // Ref is for the paragraph element
	React.HTMLAttributes<HTMLParagraphElement> // Standard paragraph attributes
>(({ className, children, ...props }, ref): JSX.Element | null => {
	const { formDescriptionId } = useFormField();

	// Avoid rendering an empty <p> tag if there are no children.
	// ---
	// Kerüljük az üres <p> elem renderelését, ha nincs children.
	if (!children) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formDescriptionId} // ID used by aria-describedby in FormControl
			className={className}
			{...props}
		>
			{children}
		</p>
	);
});
FormDescription.displayName = "FormDescription";

/**
 * `FormMessage` component:
 * Displays the validation error message for the field (if any) or explicit `children`.
 * Renders only if there is an error or `children`.
 * If an error exists, its `id` is added to `aria-describedby` and it gets `role="alert"`.
 * ---
 * `FormMessage` komponens:
 * Megjeleníti a mező érvényesítési hibaüzenetét (ha van) vagy az explicit `children` tartalmat.
 * Csak akkor renderelődik, ha van hiba vagy `children`.
 * Hiba esetén az `id`-ja automatikusan hozzáadódik a `FormControl` `aria-describedby` attribútumához,
 * és `role="alert"` attribútumot kap az akadálymentesség érdekében.
 */
export const FormMessage = React.forwardRef<
	HTMLParagraphElement, // Ref is for the paragraph element
	React.HTMLAttributes<HTMLParagraphElement> // Standard paragraph attributes
>(({ className, children, ...props }, ref): JSX.Element | null => {
	const { error, formMessageId } = useFormField();
	// Determine the content: RHF error message takes precedence over explicit children.
	// ---
	// A megjelenítendő tartalom meghatározása: A RHF hibaüzenet elsőbbséget élvez a children felett.
	const messageContent = error ? String(error?.message) : children;

	// Do not render if there's no error message and no children content.
	// ---
	// Ne rendereljünk semmit, ha nincs hibaüzenet és nincs children tartalom sem.
	if (!messageContent) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formMessageId} // ID used by aria-describedby (relevant in case of error)
			className={className}
			// data-invalid for styling purposes when there is an error
			data-invalid={error ? "true" : undefined}
			// role="alert" makes screen readers announce the error message immediately
			role={error ? "alert" : undefined}
			{...props}
		>
			{messageContent}
		</p>
	);
});
FormMessage.displayName = "FormMessage";

// Re-export FormProvider from react-hook-form
export { FormProvider };