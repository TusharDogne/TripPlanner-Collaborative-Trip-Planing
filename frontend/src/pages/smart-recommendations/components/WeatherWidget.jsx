import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherWidget = ({ location = "Paris, France" }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Mock weather data
    const mockCurrentWeather = {
      temperature: 22,
      condition: "Partly Cloudy",
      icon: "CloudSun",
      humidity: 65,
      windSpeed: 12,
      uvIndex: 6,
      visibility: 10,
      recommendation: "Perfect weather for outdoor activities! Light jacket recommended for evening."
    };

    const mockForecast = [
      { day: "Today", high: 24, low: 18, condition: "Partly Cloudy", icon: "CloudSun", precipitation: 10 },
      { day: "Tomorrow", high: 26, low: 20, condition: "Sunny", icon: "Sun", precipitation: 0 },
      { day: "Wed", high: 23, low: 17, condition: "Light Rain", icon: "CloudRain", precipitation: 70 },
      { day: "Thu", high: 25, low: 19, condition: "Sunny", icon: "Sun", precipitation: 5 },
      { day: "Fri", high: 27, low: 21, condition: "Partly Cloudy", icon: "CloudSun", precipitation: 15 },
      { day: "Sat", high: 24, low: 18, condition: "Cloudy", icon: "Cloud", precipitation: 30 },
      { day: "Sun", high: 22, low: 16, condition: "Light Rain", icon: "CloudRain", precipitation: 60 }
    ];

    setCurrentWeather(mockCurrentWeather);
    setForecast(mockForecast);
  }, [location]);

  if (!currentWeather) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 animate-pulse">
        <div className="h-6 bg-muted rounded mb-4"></div>
        <div className="h-16 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <h3 className="font-poppins font-semibold text-lg">{location}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconSize={16}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Less" : "More"}
        </Button>
      </div>
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/50 rounded-full">
            <Icon name={currentWeather?.icon} size={32} className="text-accent" />
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">
              {currentWeather?.temperature}°C
            </div>
            <div className="text-sm text-muted-foreground">
              {currentWeather?.condition}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Feels like</div>
          <div className="text-lg font-semibold">{currentWeather?.temperature + 2}°C</div>
        </div>
      </div>
      {/* Weather Recommendation */}
      <div className="bg-accent/10 rounded-lg p-3 mb-4">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">
            {currentWeather?.recommendation}
          </p>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Current Conditions Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={16} className="text-secondary" />
              <span className="text-sm">Humidity: {currentWeather?.humidity}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Wind" size={16} className="text-secondary" />
              <span className="text-sm">Wind: {currentWeather?.windSpeed} km/h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Sun" size={16} className="text-accent" />
              <span className="text-sm">UV Index: {currentWeather?.uvIndex}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-secondary" />
              <span className="text-sm">Visibility: {currentWeather?.visibility}km</span>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div>
            <h4 className="font-medium text-foreground mb-3">7-Day Forecast</h4>
            <div className="space-y-2">
              {forecast?.map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-white/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-12">{day?.day}</span>
                    <Icon name={day?.icon} size={20} className="text-accent" />
                    <span className="text-sm text-muted-foreground">{day?.condition}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="CloudRain" size={14} className="text-secondary" />
                      <span className="text-xs text-muted-foreground">{day?.precipitation}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{day?.high}°</span>
                      <span className="text-muted-foreground">/{day?.low}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Times to Visit */}
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Icon name="Clock" size={16} className="mr-2 text-accent" />
              Best Times Today
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="py-2">
                <div className="text-xs text-muted-foreground">Morning</div>
                <div className="text-sm font-medium">9-11 AM</div>
                <div className="text-xs text-success">Perfect</div>
              </div>
              <div className="py-2">
                <div className="text-xs text-muted-foreground">Afternoon</div>
                <div className="text-sm font-medium">2-5 PM</div>
                <div className="text-xs text-warning">Good</div>
              </div>
              <div className="py-2">
                <div className="text-xs text-muted-foreground">Evening</div>
                <div className="text-sm font-medium">6-8 PM</div>
                <div className="text-xs text-success">Great</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;