import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  searchQuery, 
  onSearchChange,
  viewMode,
  onViewModeChange 
}) => {
  const destinationOptions = [
    { value: '', label: 'All Destinations' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'north-america', label: 'North America' },
    { value: 'south-america', label: 'South America' },
    { value: 'africa', label: 'Africa' },
    { value: 'oceania', label: 'Oceania' }
  ];

  const budgetOptions = [
    { value: '', label: 'Any Budget' },
    { value: '0-1000', label: 'Under $1,000' },
    { value: '1000-3000', label: '$1,000 - $3,000' },
    { value: '3000-5000', label: '$3,000 - $5,000' },
    { value: '5000+', label: '$5,000+' }
  ];

  const groupSizeOptions = [
    { value: '', label: 'Any Group Size' },
    { value: '2-3', label: '2-3 people' },
    { value: '4-6', label: '4-6 people' },
    { value: '7-10', label: '7-10 people' },
    { value: '10+', label: '10+ people' }
  ];

  const tripTypeOptions = [
    { value: '', label: 'All Trip Types' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Beach', label: 'Beach' },
    { value: 'City Break', label: 'City Break' },
    { value: 'Road Trip', label: 'Road Trip' },
    { value: 'Backpacking', label: 'Backpacking' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'budget-low', label: 'Budget: Low to High' },
    { value: 'budget-high', label: 'Budget: High to Low' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-xl shadow-soft p-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <input
          type="text"
          placeholder="Search destinations, experiences, or travelers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-organic"
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          placeholder="Destination"
          options={destinationOptions}
          value={filters?.destination}
          onChange={(value) => onFilterChange('destination', value)}
        />
        
        <Select
          placeholder="Budget Range"
          options={budgetOptions}
          value={filters?.budget}
          onChange={(value) => onFilterChange('budget', value)}
        />
        
        <Select
          placeholder="Group Size"
          options={groupSizeOptions}
          value={filters?.groupSize}
          onChange={(value) => onFilterChange('groupSize', value)}
        />
        
        <Select
          placeholder="Trip Type"
          options={tripTypeOptions}
          value={filters?.tripType}
          onChange={(value) => onFilterChange('tripType', value)}
        />
        
        <Select
          placeholder="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />
      </div>
      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              iconSize={16}
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          )}
          
          <span className="text-sm text-muted-foreground">
            Showing inspiring travel stories
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('masonry')}
              className={`px-3 py-1 rounded text-sm transition-organic ${
                viewMode === 'masonry' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-3 py-1 rounded text-sm transition-organic ${
                viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;