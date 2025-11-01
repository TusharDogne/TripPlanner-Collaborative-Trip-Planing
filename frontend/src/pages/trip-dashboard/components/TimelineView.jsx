import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import axios from "axios";

const TimelineView = ({ milestones, onMilestoneAction }) => {
  const [celebratingMilestone, setCelebratingMilestone] = useState(null);
  const [completedMilestones, setCompletedMilestones] = useState(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newMilestone, setNewMilestone] = useState({
    type: "",
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    actionLabel: "",
    completed: false,
    current: false,
    actionable: false,
  });

  const milestoneTypes = [
    "friends_joined",
    "budget_agreed",
    "flights_booked",
    "accommodation_booked",
    "activities_planned",
    "packing_started",
    "departure",
  ];

  // Celebrate new milestones briefly
  useEffect(() => {
    milestones?.forEach((milestone) => {
      if (milestone?.completed && !completedMilestones?.has(milestone?.id)) {
        setCelebratingMilestone(milestone?.id);
        setCompletedMilestones((prev) => new Set([...prev, milestone.id]));
        setTimeout(() => setCelebratingMilestone(null), 2000);
      }
    });
  }, [milestones, completedMilestones]);

  // POST new milestone to backend
  const handleSaveMilestone = async () => {
    if (!newMilestone.title || !newMilestone.type) {
      alert("Please fill in the milestone Type and Title.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");

      const response = await axios.post(
        "http://localhost:8080/api/add-milestone",
        newMilestone,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Milestone added successfully!");
      console.log("✅ Response:", response.data);
      setShowPopup(false);
      setNewMilestone({
        type: "",
        title: "",
        description: "",
        startDate: "",
        dueDate: "",
        actionLabel: "",
        completed: false,
        current: false,
        actionable: false,
      });

      onMilestoneAction?.("refresh"); // Refresh parent list if needed
    } catch (error) {
      console.error("❌ Error adding milestone:", error);
      alert("Failed to add milestone. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-poppins font-bold text-lg text-foreground">
          Planning Timeline
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>
              {milestones?.filter((m) => m?.completed)?.length}/
              {milestones?.length} completed
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            iconSize={16}
            onClick={() => onMilestoneAction?.("menu")}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Keep the momentum going!
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
              onClick={() => setShowPopup(true)}
            >
              Add Milestone
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Zap"
              iconPosition="left"
              iconSize={14}
              onClick={() => onMilestoneAction?.("boost")}
            >
              Boost Progress
            </Button>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md animate-fade-in relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
              Add New Milestone
            </h2>

            <div className="space-y-3">
              {/* Type Dropdown */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Milestone Type
                </label>
                <select
                  className="w-full mt-1 p-2 border rounded-md"
                  value={newMilestone.type}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, type: e.target.value })
                  }
                >
                  <option value="">Select Type</option>
                  {milestoneTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter milestone title"
                  value={newMilestone.title}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, title: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="w-full mt-1 p-2 border rounded-md"
                  rows={2}
                  placeholder="Enter description"
                  value={newMilestone.description}
                  onChange={(e) =>
                    setNewMilestone({
                      ...newMilestone,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={newMilestone.startDate}
                  onChange={(e) =>
                    setNewMilestone({
                      ...newMilestone,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>

              {/* End Date */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={newMilestone.dueDate}
                  onChange={(e) =>
                    setNewMilestone({
                      ...newMilestone,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>

              {/* Action Label */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Action Label
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="e.g. Confirm booking"
                  value={newMilestone.actionLabel}
                  onChange={(e) =>
                    setNewMilestone({
                      ...newMilestone,
                      actionLabel: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveMilestone}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Milestone"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineView;
