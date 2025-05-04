import React, { useReducer, useState, useMemo, useCallback } from 'react';
import { Icon } from '@iconify/react';

// Campaign Row Interface
interface CampaignRowProps {
  image: string;
  title: string;
  likes: string;
  views: string;
  rate: number;
  isPositive: boolean;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onClick: () => void;
}

// Campaign State Interface
interface CampaignState {
  selected: string;
  isLoading: boolean;
  campaigns: Array<{
    image: string;
    title: string;
    likes: string;
    views: string;
    rate: number;
    isPositive: boolean;
  }>;
}

// Campaign Action Types
type CampaignAction =
  | { type: 'SET_SELECTED'; payload: string }
  | { type: 'SET_CAMPAIGNS'; payload: Array<{image: string; title: string; likes: string; views: string; rate: number; isPositive: boolean}> }
  | { type: 'SET_LOADING'; payload: boolean };

// Tab Button Component
interface TabButtonProps {
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isSelected, onClick, icon, label }) => (
  <button
    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
      isSelected ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// Sort Icon Component
interface SortIconProps {
  column: string;
  sortConfig: { key: string; direction: 'ascending' | 'descending' };
}

const SortIcon: React.FC<SortIconProps> = ({ column, sortConfig }) => {
  if (sortConfig.key !== column) {
    return <Icon icon="lucide:chevrons-up-down" className="w-3.5 h-3.5 text-gray-400" />;
  }
  if (sortConfig.direction === 'ascending') {
    return <Icon icon="lucide:chevron-up" className="w-3.5 h-3.5 text-blue-600" />;
  }
  return <Icon icon="lucide:chevron-down" className="w-3.5 h-3.5 text-blue-600" />;
};

// Empty State Component
interface EmptyStateProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, actionLabel, onAction }) => (
    <div className="py-12 flex flex-col items-center text-center">
        <div className="bg-gray-100 rounded-full p-3 mb-4 text-gray-500">
            {icon}
        </div>
        <h4 className="text-lg font-semibold text-gray-700 mb-1">{title}</h4>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        {actionLabel && onAction && (
            <button
                className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                onClick={onAction}
            >
                <Icon icon="lucide:plus" className="w-4 h-4" />
                <span>{actionLabel}</span>
            </button>
        )}
    </div>
);

// Campaign Row Component
const CampaignRow: React.FC<CampaignRowProps> = ({
  image,
  title,
  likes,
  views,
  rate,
  isPositive,
  index,
  isSelected,
  onSelect,
  onClick,
}) => {
  return (
    <div
      className={`grid grid-cols-5 gap-4 items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2 cursor-pointer"
          checked={isSelected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()} // Prevent row click when checkbox is clicked
        />
        <img src={image} alt={title} className="h-8 w-8 rounded-full mr-2" />
        <span className="text-sm font-medium text-gray-900 truncate cursor-pointer" onClick={onClick}>{title}</span>
      </div>
      <div className="text-center text-sm text-gray-700">{likes}</div>
      <div className="text-center text-sm text-gray-700">{views}</div>
      <div className="text-center text-sm">
        <div className="flex items-center justify-center">
          {isPositive ? (
            <Icon icon="lucide:arrow-up" className="w-3.5 h-3.5 text-green-500 mr-1" />
          ) : (
            <Icon icon="lucide:arrow-down" className="w-3.5 h-3.5 text-red-500 mr-1" />
          )}
          <span className={isPositive ? "text-green-600" : "text-red-600"}>{rate}%</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-blue-100 transition-colors" title="View Details" onClick={onClick}>
          <Icon icon="lucide:eye" className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-green-600 p-1 rounded-full hover:bg-green-100 transition-colors" title="Edit">
          <Icon icon="lucide:edit-2" className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors" title="Delete">
          <Icon icon="lucide:trash-2" className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors" title="Share">
          <Icon icon="lucide:share" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Change the default export to a named export
export const CampaignList = () => {
  // Move state declarations before the reducer
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  }>({
    key: '',
    direction: 'ascending'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaignIndex, setSelectedCampaignIndex] = useState<number | null>(null);

  // Now define the reducer after the state variables are initialized
  const [state, dispatch] = useReducer(
    (state: CampaignState, action: CampaignAction) => {
      switch (action.type) {
        case 'SET_SELECTED':
          // Reset selections and sorting when tab changes
          setSelectedItems(new Set());
          setSelectAll(false);
          setSortConfig({ key: '', direction: 'ascending' });
          return { ...state, selected: action.payload, isLoading: true };
        case 'SET_CAMPAIGNS':
          return { ...state, campaigns: action.payload, isLoading: false };
        case 'SET_LOADING':
          return { ...state, isLoading: action.payload };
        default:
          return state;
      }
    },
    {
      selected: "published",
      isLoading: false,
      campaigns: [
        {
          image: "https://img.heroui.chat/image/ai?w=200&h=200&u=1",
          title: "Hurry! 50% off everything! 🔥",
          likes: "320",
          views: "742",
          rate: 12.6,
          isPositive: true
        },
        {
          image: "https://img.heroui.chat/image/ai?w=200&h=200&u=2",
          title: "Last chance! 60% off clearance! 🛒",
          likes: "368",
          views: "143",
          rate: 24.3,
          isPositive: true
        },
        {
          image: "https://img.heroui.chat/image/ai?w=200&h=200&u=3",
          title: "Exclusive! Buy one, get one free! 🎉",
          likes: "45",
          views: "190",
          rate: 7.6,
          isPositive: false
        },
        {
          image: "https://img.heroui.chat/image/ai?w=200&h=200&u=4",
          title: "Limited offer! 40% off sitewide! 🎈",
          likes: "320",
          views: "742",
          rate: 20.9,
          isPositive: true
        },
        {
          image: "https://img.heroui.chat/image/ai?w=200&h=200&u=5",
          title: "Flash sale! Save 30%! ⚡",
          likes: "403",
          views: "168",
          rate: 55.6,
          isPositive: true
        }
      ]
    }
  );

  // Handle tab change
  const handleTabChange = useCallback((key: string) => {
    dispatch({ type: 'SET_SELECTED', payload: key });

    // Simulate API call
    setTimeout(() => {
      if (key === "scheduled") {
        dispatch({
          type: 'SET_CAMPAIGNS',
          payload: [
            {
              image: "https://img.heroui.chat/image/ai?w=200&h=200&u=6",
              title: "Coming soon! New collection launch! 👕",
              likes: "0",
              views: "0",
              rate: 0,
              isPositive: true
            },
            {
              image: "https://img.heroui.chat/image/ai?w=200&h=200&u=7",
              title: "Weekend special! Extra 25% off! 🏷️",
              likes: "0",
              views: "0",
              rate: 0,
              isPositive: true
            }
          ]
        });
      } else if (key === "draft") {
        dispatch({
          type: 'SET_CAMPAIGNS',
          payload: []
        });
      } else { // Published
        dispatch({
          type: 'SET_CAMPAIGNS',
          payload: [
            {
              image: "https://img.heroui.chat/image/ai?w=200&h=200&u=1",
              title: "Hurry! 50% off everything! 🔥",
              likes: "320",
              views: "742",
              rate: 12.6,
              isPositive: true
            },
            {
              image: "https://img.heroui.chat/image/ai?w=200&h=200&u=2",
              title: "Last chance! 60% off clearance! 🛒",
              likes: "368",
              views: "143",
              rate: 24.3,
              isPositive: true
            },
            {
              image: "https://img.heroui.chat/image/ai?w=200&h=200&u=3",
              title: "Exclusive! Buy one, get one free! 🎉",
              likes: "45",
              views: "190",
              rate: 7.6,
              isPositive: false
            },
            {
              image: "https://img.heroui.chat/image/ai?w=200&h=200&u=4",
              title: "Limited offer! 40% off sitewide! 🎈",
              likes: "320",
              views: "742",
              rate: 20.9,
              isPositive: true
            },
            {
              image: "https://img.heroui.chat/image/ai?w=200&h=200&u=5",
              title: "Flash sale! Save 30%! ⚡",
              likes: "403",
              views: "168",
              rate: 55.6,
              isPositive: true
            }
          ]
        });
      }
    }, 800);
  }, []);

  // Handle new post button click
  const handleNewPost = useCallback(() => {
    alert("New campaign post created!");
  }, []);

  // Filter and sort campaigns first
  const filteredCampaigns = useMemo(() => {
    let campaigns = [...state.campaigns];
    if (searchQuery) {
        campaigns = campaigns.filter(campaign =>
            campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    return campaigns;
  }, [state.campaigns, searchQuery]);

  const sortedCampaigns = useMemo(() => {
    let sortableItems = [...filteredCampaigns];
    if (sortConfig.key) {
      sortableItems.sort((a: any, b: any) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle numeric sorting for likes, views, rate
        if (['likes', 'views', 'rate'].includes(sortConfig.key)) {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        } else { // Handle string sorting for title
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCampaigns, sortConfig]);

   // Map original index after filtering/sorting for selection state
   const getOriginalIndex = useCallback((filteredIndex: number) => {
     if (!sortedCampaigns[filteredIndex]) return -1; // Should not happen
     const item = sortedCampaigns[filteredIndex];
     return state.campaigns.findIndex(originalItem => originalItem === item);
   }, [sortedCampaigns, state.campaigns]);

  // Handle select all
  const handleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      // Select only the indices present in the *currently displayed* list
      const allDisplayedOriginalIndexes = new Set(
        sortedCampaigns.map((_, index) => getOriginalIndex(index)).filter(idx => idx !== -1)
      );
      setSelectedItems(allDisplayedOriginalIndexes);
    }
    setSelectAll(!selectAll);
  }, [selectAll, sortedCampaigns, getOriginalIndex]);

  // Handle individual selection - use original index
  const handleSelectItem = useCallback((filteredIndex: number) => {
    const originalIndex = getOriginalIndex(filteredIndex);
    if (originalIndex === -1) return; // Item not found

    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(originalIndex)) {
        newSet.delete(originalIndex);
      } else {
        newSet.add(originalIndex);
      }
      // Check if all *currently displayed* items are selected
      const allDisplayedOriginalIndexes = sortedCampaigns.map((_, index) => getOriginalIndex(index)).filter(idx => idx !== -1);
      setSelectAll(allDisplayedOriginalIndexes.every(idx => newSet.has(idx)) && allDisplayedOriginalIndexes.length > 0);
      return newSet;
    });
  }, [getOriginalIndex, sortedCampaigns]);

  // Update selectAll state when selectedItems or sortedCampaigns change
  React.useEffect(() => {
    if (sortedCampaigns.length === 0) {
        setSelectAll(false);
        return;
    }
    const allDisplayedOriginalIndexes = sortedCampaigns.map((_, index) => getOriginalIndex(index)).filter(idx => idx !== -1);
    const allDisplayedSelected = allDisplayedOriginalIndexes.length > 0 && allDisplayedOriginalIndexes.every(idx => selectedItems.has(idx));
    setSelectAll(allDisplayedSelected);
  }, [selectedItems, sortedCampaigns, getOriginalIndex]);


  // Handle bulk actions
  const handleBulkAction = useCallback((action: string) => {
    if (selectedItems.size === 0) return;

    const selectedTitles = Array.from(selectedItems).map(index => state.campaigns[index]?.title).filter(Boolean);
    alert(`${action} ${selectedItems.size} items: \n${selectedTitles.join('\n')}\n\nSuccessfully ${action.toLowerCase()}ed ${selectedItems.size} campaigns.`);

    // Example: Implement actual delete logic (would modify state.campaigns via dispatch)
    // if (action === 'Delete') {
    //   const remainingCampaigns = state.campaigns.filter((_, index) => !selectedItems.has(index));
    //   dispatch({ type: 'SET_CAMPAIGNS', payload: remainingCampaigns });
    // }

    // Reset selection
    setSelectedItems(new Set());
    setSelectAll(false);
  }, [selectedItems, state.campaigns]);

  // Handle sort request
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle campaign click - use original index
  const handleCampaignClick = (filteredIndex: number) => {
    const originalIndex = getOriginalIndex(filteredIndex);
     if (originalIndex !== -1) {
        setSelectedCampaignIndex(originalIndex);
        setIsModalOpen(true);
     }
  };

  const selectedCampaignData = useMemo(() => {
      if (selectedCampaignIndex !== null && state.campaigns[selectedCampaignIndex]) {
          return state.campaigns[selectedCampaignIndex];
      }
      return null;
  }, [selectedCampaignIndex, state.campaigns]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-4 px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3 sm:gap-0">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Campaigns</h3>
              <p className="text-xs sm:text-sm text-gray-500">Marketing performance overview</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
              {/* Tabs */}
              <div className="flex bg-gray-100 p-0.5 rounded-full">
                <TabButton
                  isSelected={state.selected === "published"}
                  onClick={() => handleTabChange("published")}
                  icon={<Icon icon="lucide:check-circle" className="w-3.5 h-3.5" />}
                  label="Published"
                />
                <TabButton
                  isSelected={state.selected === "scheduled"}
                  onClick={() => handleTabChange("scheduled")}
                  icon={<Icon icon="lucide:clock" className="w-3.5 h-3.5" />}
                  label="Scheduled"
                />
                <TabButton
                  isSelected={state.selected === "draft"}
                  onClick={() => handleTabChange("draft")}
                  icon={<Icon icon="lucide:file" className="w-3.5 h-3.5" />}
                  label="Draft"
                />
              </div>

              <button
                className="inline-flex items-center gap-1 bg-blue-600 text-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleNewPost}
              >
                <Icon icon="lucide:plus" className="w-4 h-4" />
                <span className="hidden sm:inline">New</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3 sm:gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {selectedItems.size > 0 ? (
                <>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {selectedItems.size} selected
                  </span>
                  <button
                    className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-xs sm:text-sm font-medium hover:bg-red-100 transition-colors"
                    onClick={() => handleBulkAction("Delete")}
                  >
                    <Icon icon="lucide:trash-2" className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                  <button
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors"
                    onClick={() => handleBulkAction("Archive")}
                  >
                    <Icon icon="lucide:archive" className="w-3.5 h-3.5" />
                    <span>Archive</span>
                  </button>
                </>
              ) : (
                 <div className="h-[26px]"></div> // Placeholder to prevent layout shift
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative flex-grow sm:flex-grow-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="lucide:search" className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full sm:w-56 md:w-64 pl-10 pr-8 py-1.5 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                     <Icon icon="lucide:x" className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                   onClick={() => alert("Filter options clicked!")} // Placeholder action
                >
                  <Icon icon="lucide:filter" className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                 {/* Add Dropdown Menu here if needed */}
              </div>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="border-t border-gray-200 overflow-x-auto">
           <div className="min-w-[640px]"> {/* Ensure minimum width for table content */}
              <div className="grid grid-cols-5 gap-4 text-xs sm:text-sm text-gray-500 font-medium px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center col-span-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2 focus:ring-blue-500"
                    checked={selectAll && sortedCampaigns.length > 0}
                    onChange={handleSelectAll}
                    disabled={sortedCampaigns.length === 0}
                    aria-label="Select all campaigns"
                  />
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
                    onClick={() => requestSort('title')}
                  >
                    Campaign
                    <SortIcon column="title" sortConfig={sortConfig} />
                  </div>
                </div>
                <div
                  className="text-center cursor-pointer col-span-1"
                  onClick={() => requestSort('likes')}
                >
                  <div className="flex items-center justify-center gap-1 hover:text-gray-700">
                    Likes
                    <SortIcon column="likes" sortConfig={sortConfig} />
                  </div>
                </div>
                <div
                  className="text-center cursor-pointer col-span-1"
                  onClick={() => requestSort('views')}
                >
                  <div className="flex items-center justify-center gap-1 hover:text-gray-700">
                    Views
                    <SortIcon column="views" sortConfig={sortConfig} />
                  </div>
                </div>
                <div
                  className="text-center cursor-pointer col-span-1"
                  onClick={() => requestSort('rate')}
                >
                  <div className="flex items-center justify-center gap-1 hover:text-gray-700">
                    Conv. Rate
                    <SortIcon column="rate" sortConfig={sortConfig} />
                  </div>
                </div>
                <div className="text-center col-span-1">Actions</div>
              </div>

              {/* Content Body */}
              <div className="px-4 sm:px-6">
                {state.isLoading ? (
                  <div className="py-12 flex justify-center">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="mt-2 text-sm text-gray-500">Loading campaigns...</span>
                    </div>
                  </div>
                ) : sortedCampaigns.length === 0 ? (
                    searchQuery ? (
                         <EmptyState
                            title="No matching campaigns"
                            description="Your search did not match any campaigns. Try adjusting your query."
                            icon={<Icon icon="lucide:search" className="w-6 h-6" />}
                        />
                    ) : (
                         <EmptyState
                            title={`No ${state.selected} campaigns`}
                            description={`There are no campaigns in the ${state.selected} category yet.`}
                            icon={
                                state.selected === 'published' ? <Icon icon="lucide:check-circle" className="w-6 h-6" /> :
                                state.selected === 'scheduled' ? <Icon icon="lucide:clock" className="w-6 h-6" /> :
                                <Icon icon="lucide:file-text" className="w-6 h-6" />
                            }
                            actionLabel="Create new campaign"
                            onAction={handleNewPost}
                         />
                    )
                ) : (
                  sortedCampaigns.map((campaign, index) => {
                    const originalIndex = getOriginalIndex(index);
                    return (
                        <CampaignRow
                        key={originalIndex} // Use original index or a unique campaign ID if available
                        index={index} // Pass the filtered index for selection handling
                        image={campaign.image}
                        title={campaign.title}
                        likes={campaign.likes}
                        views={campaign.views}
                        rate={campaign.rate}
                        isPositive={campaign.isPositive}
                        isSelected={selectedItems.has(originalIndex)}
                        onSelect={() => handleSelectItem(index)}
                        onClick={() => handleCampaignClick(index)}
                        />
                    );
                  })
                )}
              </div>
            </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCampaignData && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal panel */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh]">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sticky top-0 z-10 border-b border-gray-200">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <Icon icon="lucide:bar-chart-2" className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Campaign Details
                      </h3>
                    </div>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        onClick={() => setIsModalOpen(false)}
                        aria-label="Close modal"
                    >
                        <Icon icon="lucide:x" className="w-5 h-5" />
                    </button>
                 </div>
              </div>
              <div className="px-4 py-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-130px)]"> {/* Adjusted max-height calculation */}
                <div className="sm:flex sm:gap-6">
                  {/* Left Column */}
                  <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
                    <img
                      src={selectedCampaignData.image}
                      alt={selectedCampaignData.title}
                      className="w-full h-48 object-cover rounded-xl shadow-sm"
                    />

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            state.selected === 'published' ? 'bg-green-100 text-green-800' :
                            state.selected === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                          {state.selected.charAt(0).toUpperCase() + state.selected.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Created:</span>
                        <span className="text-gray-700">May 12, 2023</span> {/* Static Data */}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Last updated:</span>
                        <span className="text-gray-700">June 3, 2023</span> {/* Static Data */}
                      </div>
                       <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Category:</span>
                        <span className="text-gray-700">Promotion</span> {/* Static Data */}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="w-full sm:w-2/3 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{selectedCampaignData.title}</h3>
                      <p className="text-gray-600 mt-1 text-sm">
                        This campaign targets existing customers with a limited-time discount offer to drive repeat purchases and increase average order value. (Placeholder description)
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="text-gray-500 text-xs sm:text-sm mb-1 font-medium">Likes</div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-800">{selectedCampaignData.likes}</div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-1.5 bg-pink-500 rounded-full"
                            style={{ width: `${Math.min((parseInt(selectedCampaignData.likes) / 500) * 100, 100)}%` }} // Example scaling
                          ></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="text-gray-500 text-xs sm:text-sm mb-1 font-medium">Views</div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-800">{selectedCampaignData.views}</div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-1.5 bg-blue-500 rounded-full"
                            style={{ width: `${Math.min((parseInt(selectedCampaignData.views) / 1000) * 100, 100)}%` }} // Example scaling
                          ></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="text-gray-500 text-xs sm:text-sm mb-1 font-medium">Conversion</div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-800">{selectedCampaignData.rate}%</div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-1.5 ${selectedCampaignData.isPositive ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
                            style={{ width: `${Math.min(selectedCampaignData.rate, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Platforms */}
                    <div>
                        <h4 className="font-medium text-gray-700 mb-2 text-sm">Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                            {/* Replace SVG with actual icons if needed, or use text */}
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Twitter
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                Facebook
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                                Instagram
                            </span>
                             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Email
                            </span>
                        </div>
                    </div>

                    {/* Performance Chart Placeholder */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Performance Trend</h4>
                      <div className="h-40 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                        <div className="text-gray-400 flex flex-col items-center text-center px-4">
                          <Icon icon="lucide:bar-chart-2" className="w-8 h-8 mb-2" />
                          <span className="text-xs sm:text-sm">Detailed performance chart coming soon</span>
                        </div>
                      </div>
                    </div>

                    {/* Removed the excessive repetition of the performance chart block */}

                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sticky bottom-0 z-10 border-t border-gray-200">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => alert('Edit Campaign Clicked!')}
                >
                   <Icon icon="lucide:edit-2" className="w-4 h-4 mr-2 -ml-1"/> Edit Campaign
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add default export to maintain backward compatibility
export default CampaignList;