import React from 'react';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Tab, Tabs, Button, Tooltip, Input } from '@heroui/react';
import { Spinner } from '@heroui/react';
import { addToast } from '@heroui/react';

interface TeamRowProps {
  icon: string;
  label: string;
  count: string;
  percentage: number;
}

interface TeamState {
  selected: string;
  isLoading: boolean;
  teams: Array<{
    icon: string;
    label: string;
    count: string;
    percentage: number;
  }>;
}

type TeamAction = 
  | { type: 'SET_SELECTED'; payload: string }
  | { type: 'SET_TEAMS'; payload: Array<{icon: string; label: string; count: string; percentage: number}> }
  | { type: 'SET_LOADING'; payload: boolean };

export const TeamPerformance = () => {
  // Use reducer for complex state management
  const [state, dispatch] = React.useReducer(
    (state: TeamState, action: TeamAction) => {
      switch (action.type) {
        case 'SET_SELECTED':
          return { ...state, selected: action.payload, isLoading: true };
        case 'SET_TEAMS':
          return { ...state, teams: action.payload, isLoading: false };
        case 'SET_LOADING':
          return { ...state, isLoading: action.payload };
        default:
          return state;
      }
    },
    {
      selected: "all",
      isLoading: false,
      teams: [
        { icon: "lucide:shield", label: "Chelsea", count: "1,235", percentage: 65.3 },
        { icon: "lucide:shield", label: "Liverpool", count: "980", percentage: 55.2 },
        { icon: "lucide:shield", label: "Everton", count: "736", percentage: 50.1 },
        { icon: "lucide:shield", label: "Fulham", count: "566", percentage: 40.2 }
      ]
    }
  );
  
  // Handle tab change
  const handleTabChange = React.useCallback((key: React.Key) => {
    dispatch({ type: 'SET_SELECTED', payload: key as string });
  }, []);
  
  // Filter teams based on selected tab
  React.useEffect(() => {
    // Skip initial render
    if (!state.isLoading) return;
    
    // Simulate API call for different tabs
    const timer = setTimeout(() => {
      if (state.selected === "home") {
        dispatch({ 
          type: 'SET_TEAMS', 
          payload: [
            { icon: "lucide:shield", label: "Chelsea", count: "835", percentage: 72.1 },
            { icon: "lucide:shield", label: "Liverpool", count: "680", percentage: 61.5 },
            { icon: "lucide:shield", label: "Everton", count: "436", percentage: 48.7 }
          ]
        });
      } else if (state.selected === "away") {
        dispatch({ 
          type: 'SET_TEAMS', 
          payload: [
            { icon: "lucide:shield", label: "Chelsea", count: "400", percentage: 58.2 },
            { icon: "lucide:shield", label: "Liverpool", count: "300", percentage: 49.8 },
            { icon: "lucide:shield", label: "Fulham", count: "366", percentage: 38.4 }
          ]
        });
      } else {
        dispatch({ 
          type: 'SET_TEAMS', 
          payload: [
            { icon: "lucide:shield", label: "Chelsea", count: "1,235", percentage: 65.3 },
            { icon: "lucide:shield", label: "Liverpool", count: "980", percentage: 55.2 },
            { icon: "lucide:shield", label: "Everton", count: "736", percentage: 50.1 },
            { icon: "lucide:shield", label: "Fulham", count: "566", percentage: 40.2 }
          ]
        });
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [state.isLoading, state.selected]);
  
  // Add filter state
  const [filterValue, setFilterValue] = React.useState("");
  
  // Filter teams based on search input
  const filteredTeams = React.useMemo(() => {
    if (!filterValue) return state.teams;
    
    return state.teams.filter(team => 
      team.label.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [state.teams, filterValue]);
  
  // Memoize the team list to prevent unnecessary re-renders
  const teamList = React.useMemo(() => {
    if (state.isLoading) {
      return (
        <div className="py-8 flex justify-center">
          <Spinner color="primary" label="Loading teams..." />
        </div>
      );
    }
    
    if (filteredTeams.length === 0) {
      return (
        <EmptyState 
          title={filterValue ? "No matching teams" : "No team data available"} 
          description={filterValue ? "Try a different search term" : "There is no performance data for the selected filter."}
          icon="lucide:database"
        />
      );
    }
    
    return (
      <div className="space-y-5">
        {filteredTeams.map((team, index) => (
          <TeamRow 
            key={`${team.label}-${index}`}
            icon={team.icon} 
            label={team.label} 
            count={team.count} 
            percentage={team.percentage} 
          />
        ))}
      </div>
    );
  }, [filteredTeams, state.isLoading, filterValue]);
  
  return (
    <div className="flex flex-col gap-4">
      <Tabs 
        selectedKey={state.selected} 
        onSelectionChange={handleTabChange}
        color="primary"
        variant="underlined"
        size="sm"
        aria-label="Team performance filters"
        classNames={{
          tabList: "gap-4",
          cursor: "w-full",
          tab: "px-0 h-8"
        }}
      >
        <Tab key="all" title="All" />
        <Tab key="home" title="Home" />
        <Tab key="away" title="Away" />
      </Tabs>
      
      {/* Add search filter */}
      <Input
        placeholder="Search teams..."
        value={filterValue}
        onValueChange={setFilterValue}
        startContent={<Icon icon="lucide:search" className="text-default-400 w-4 h-4" />}
        size="sm"
        variant="bordered"
        className="max-w-xs"
        clearable
      />
      
      {teamList}
    </div>
  );
};

const TeamRow = React.memo(({ icon, label, count, percentage }: TeamRowProps) => {
  const getProgressColor = (value: number) => {
    if (value >= 60) return "bg-success";
    if (value >= 50) return "bg-primary";
    if (value >= 40) return "bg-warning";
    return "bg-danger";
  };
  
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
        <Icon icon={icon} className="w-5 h-5 text-primary" />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-medium">{label}</span>
            <span className="text-sm text-default-500">({count})</span>
          </div>
          <span className="font-medium">{percentage.toFixed(1)}%</span>
        </div>
        
        <div className="h-2 w-full rounded-full bg-default-100">
          <div 
            className={`h-full rounded-full ${getProgressColor(percentage)}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
});

// Add display name for React.memo component
TeamRow.displayName = 'TeamRow';

// Add EmptyState component
const EmptyState = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="bg-default-100 rounded-full p-4 mb-4">
        <Icon icon={icon} className="w-8 h-8 text-default-400" />
      </div>
      <h4 className="text-lg font-medium mb-1">{title}</h4>
      <p className="text-sm text-default-500 max-w-xs">{description}</p>
    </div>
  );
};