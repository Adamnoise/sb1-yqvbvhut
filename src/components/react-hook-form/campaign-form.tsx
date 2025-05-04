// New file for React Hook Form with Zod implementation
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Define form schema with Zod
const campaignSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  discount: z.string().regex(/^\d+$/, 'Must be a number').transform(Number).refine(val => val > 0 && val <= 100, 'Discount must be between 1 and 100'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  isActive: z.boolean().optional(),
  isHighlighted: z.boolean().optional(),
  category: z.string().min(1, 'Category is required'),
});

// Define form data type
type CampaignFormData = z.infer<typeof campaignSchema>;

export const CampaignForm = () => {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: '',
      description: '',
      discount: '',
      startDate: '',
      endDate: '',
      platforms: [],
      isActive: true,
      isHighlighted: false,
      category: '',
    }
  });
  
  const onSubmit = async (data: CampaignFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', data);
    
    // Show success toast
    toast.success('Campaign created successfully', {
      description: `"${data.title}" has been created and is ready to publish.`,
      action: {
        label: 'View',
        onClick: () => console.log('View campaign'),
      },
    });
    
    // Reset form
    reset();
  };
  
  return (
    <Card className="border-none shadow-card">
      <CardHeader className="px-6 pt-6 pb-0">
        <div>
          <h3 className="text-xl font-semibold">Create Campaign</h3>
          <p className="text-sm text-default-500">Add a new marketing campaign</p>
        </div>
      </CardHeader>
      
      <CardBody className="px-6 overflow-hidden">
        <motion.form 
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Campaign Title"
                    placeholder="Enter campaign title"
                    variant="bordered"
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                    startContent={<Icon icon="lucide:megaphone" className="text-default-400 w-4 h-4" />}
                  />
                )}
              />
              
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    placeholder="Enter campaign description"
                    variant="bordered"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                    minRows={3}
                  />
                )}
              />
              
              <Controller
                name="discount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Discount Percentage"
                    placeholder="Enter discount percentage"
                    variant="bordered"
                    isInvalid={!!errors.discount}
                    errorMessage={errors.discount?.message}
                    startContent={<Icon icon="lucide:percent" className="text-default-400 w-4 h-4" />}
                    endContent={<span className="text-default-400">%</span>}
                  />
                )}
              />
              
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                    placeholder="Select campaign category"
                    variant="bordered"
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message}
                  >
                    <SelectItem key="discount" value="discount">Discount</SelectItem>
                    <SelectItem key="seasonal" value="seasonal">Seasonal</SelectItem>
                    <SelectItem key="holiday" value="holiday">Holiday</SelectItem>
                    <SelectItem key="flash" value="flash">Flash Sale</SelectItem>
                    <SelectItem key="clearance" value="clearance">Clearance</SelectItem>
                  </Select>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Start Date"
                      placeholder="Select start date"
                      type="date"
                      variant="bordered"
                      isInvalid={!!errors.startDate}
                      errorMessage={errors.startDate?.message}
                    />
                  )}
                />
                
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="End Date"
                      placeholder="Select end date"
                      type="date"
                      variant="bordered"
                      isInvalid={!!errors.endDate}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                />
              </div>
              
              <Controller
                name="platforms"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <p className={`text-sm ${errors.platforms ? 'text-danger' : ''}`}>
                      Platforms <span className="text-danger">*</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok'].map(platform => (
                        <Chip
                          key={platform}
                          variant={field.value.includes(platform.toLowerCase()) ? 'solid' : 'bordered'}
                          color={field.value.includes(platform.toLowerCase()) ? 'primary' : 'default'}
                          className="cursor-pointer"
                          onClick={() => {
                            const value = platform.toLowerCase();
                            const newValue = field.value.includes(value)
                              ? field.value.filter(p => p !== value)
                              : [...field.value, value];
                            field.onChange(newValue);
                          }}
                          startContent={
                            <Icon 
                              icon={`logos:${platform.toLowerCase()}`} 
                              className="w-3.5 h-3.5" 
                            />
                          }
                        >
                          {platform}
                        </Chip>
                      ))}
                    </div>
                    {errors.platforms && (
                      <p className="text-danger text-xs mt-1">{errors.platforms.message}</p>
                    )}
                  </div>
                )}
              />
              
              <div className="space-y-2">
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      isSelected={field.value}
                      onValueChange={field.onChange}
                    >
                      Activate campaign immediately
                    </Checkbox>
                  )}
                />
                
                <Controller
                  name="isHighlighted"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      isSelected={field.value}
                      onValueChange={field.onChange}
                    >
                      Highlight on homepage
                    </Checkbox>
                  )}
                />
              </div>
            </div>
          </div>
        </motion.form>
      </CardBody>
      
      <CardFooter className="px-6 py-4 flex justify-end gap-2">
        <Button 
          variant="flat" 
          color="default"
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button 
          color="primary"
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          startContent={!isSubmitting && <Icon icon="lucide:save" className="w-4 h-4" />}
        >
          {isSubmitting ? 'Creating...' : 'Create Campaign'}
        </Button>
      </CardFooter>
    </Card>
  );
};