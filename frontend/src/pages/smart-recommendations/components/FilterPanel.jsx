import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onReset, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const budgetOptions = [
    { value: 'budget', label: 'Budget ($0-50)' },
    { value: 'moderate', label: 'Moderate ($50-150)' },
    { value: 'premium', label: 'Premium ($150-300)' },
    { value: 'luxury', label: 'Luxury ($300+)' }
  ];

  const categoryOptions = [
    { value: 'destination', label: 'Destinations' },
    { value: 'activity', label: 'Activities' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'dining', label: 'Dining' },
    { value: 'transport', label: 'Transport' }
  ];

  const groupSizeOptions = [
    { value: '1-2', label: '1-2 people' },
    { value: '3-5', label: '3-5 people' },
    { value: '6-10', label: '6-10 people' },
    { value: '10+', label: '10+ people' }
  ];

  const durationOptions = [
    { value: '1-3', label: '1-3 hours' },
    { value: '4-8', label: '4-8 hours' },
    { value: '1-day', label: 'Full day' },
    { value: 'multi-day', label: 'Multi-day' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = localFilters?.[key] || [];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray?.filter(item => item !== value);
    
    handleFilterChange(key, newArray);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      categories: [],
      budgetRange: '',
      groupSize: '',
      duration: '',
      accessibility: false,
      hiddenGems: false,
      weatherOptimal: false
    };
    setLocalFilters(resetFilters);
    onReset();
  };

  const activeFilterCount = Object.values(localFilters)?.filter(value => {
    if (Array.isArray(value)) return value?.length > 0;
    if (typeof value === 'boolean') return value;
    return value !== '' && value !== null && value !== undefined;
  })?.length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card rounded-xl border border-border p-6 ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-poppins font-semibold text-lg">Filters</h3>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground"
            >
              Reset
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Input
              label="Search"
              type="search"
              placeholder="Search destinations, activities..."
              value={localFilters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Categories
            </label>
            <div className="space-y-2">
              {categoryOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={(localFilters?.categories || [])?.includes(option?.value)}
                  onChange={(e) => handleArrayFilterChange('categories', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <Select
              label="Budget Range"
              options={budgetOptions}
              value={localFilters?.budgetRange || ''}
              onChange={(value) => handleFilterChange('budgetRange', value)}
              placeholder="Select budget range"
            />
          </div>

          {/* Group Size */}
          <div>
            <Select
              label="Group Size"
              options={groupSizeOptions}
              value={localFilters?.groupSize || ''}
              onChange={(value) => handleFilterChange('groupSize', value)}
              placeholder="Select group size"
            />
          </div>

          {/* Duration */}
          <div>
            <Select
              label="Duration"
              options={durationOptions}
              value={localFilters?.duration || ''}
              onChange={(value) => handleFilterChange('duration', value)}
              placeholder="Select duration"
            />
          </div>

          {/* Special Options */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Special Options
            </label>
            <div className="space-y-2">
              <Checkbox
                label="Accessibility friendly"
                checked={localFilters?.accessibility || false}
                onChange={(e) => handleFilterChange('accessibility', e?.target?.checked)}
              />
              <Checkbox
                label="Hidden gems only"
                checked={localFilters?.hiddenGems || false}
                onChange={(e) => handleFilterChange('hiddenGems', e?.target?.checked)}
              />
              <Checkbox
                label="Weather optimal"
                checked={localFilters?.weatherOptimal || false}
                onChange={(e) => handleFilterChange('weatherOptimal', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Distance Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Distance from base: {localFilters?.distance || 50}km
            </label>
            <input
              type="range"
              min="5"
              max="200"
              value={localFilters?.distance || 50}
              onChange={(e) => handleFilterChange('distance', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5km</span>
              <span>200km</span>
            </div>
          </div>
        </div>

        {/* Apply Button (Mobile) */}
        <div className="lg:hidden mt-6 pt-6 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={onToggle}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;