import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";

// --- ICON Component ---
const Icon = ({ name, size = 24, className = "" }) => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const LucideIcon = LucideIcons[capitalizedName];
  if (!LucideIcon) return <span className={`text-red-500 ${className}`} style={{ width: size, height: size, display: "inline-block" }}>?</span>;
  return <LucideIcon size={size} className={className} />;
};

// --- Button Component ---
const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
  const baseClasses = "font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-[1.03] shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/50",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-gray-400/50",
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

// --- Modal ---
const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-[999] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl p-6 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition p-2 rounded-full hover:bg-gray-100"
        >
          <Icon name="X" size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

// --- Unsplash Images ---
const getRandomUnsplash = (query, width = 400, height = 200) =>
  `https://source.unsplash.com/${width}x${height}/?${query}&sig=${Math.floor(Math.random() * 1000)}`;

// --- Realistic Goa Hotels + Meals Data ---
const MOCKED_API_RESPONSE = [
  {
    hotelId: "h1",
    hotelName: "Taj Fort Aguada Resort & Spa",
    hotelCity: "Goa",
    hotelAddress: "Sinquerim, North Goa, Goa",
    image: getRandomUnsplash("taj resort goa,beach"),
    rooms: [
      { roomId: "r11", roomName: "Deluxe Sea View", roomType: "Deluxe", price: "12000", availableRooms: 3, roomDescription: "Beautiful room with sea-facing balcony.", image: getRandomUnsplash("luxury room interior") },
      { roomId: "r12", roomName: "Suite", roomType: "Suite", price: "20000", availableRooms: 2, roomDescription: "Spacious suite with separate living area.", image: getRandomUnsplash("suite room luxury") }
    ],
    meals: [
      { mealId: "m11", mealName: "Goan Fish Curry", mealType: "Dinner", mealPrice: "₹600", mealDescription: "Coconut-based Goan fish curry.", image: getRandomUnsplash("goan fish curry") },
      { mealId: "m12", mealName: "Chicken Xacuti", mealType: "Lunch / Dinner", mealPrice: "₹750", mealDescription: "Traditional Goan chicken xacuti.", image: getRandomUnsplash("chicken xacuti goa") }
    ]
  },
  {
    hotelId: "h2",
    hotelName: "Grand Hyatt Goa",
    hotelCity: "Goa",
    hotelAddress: "Bambolim Beach, Goa",
    image: getRandomUnsplash("grand hyatt goa resort"),
    rooms: [
      { roomId: "r21", roomName: "Bay View Room", roomType: "Deluxe", price: "10000", availableRooms: 4, roomDescription: "Room overlooking Bambolim Bay.", image: getRandomUnsplash("beach resort room") },
      { roomId: "r22", roomName: "Club Suite", roomType: "Suite", price: "18000", availableRooms: 1, roomDescription: "Club-level suite with lounge.", image: getRandomUnsplash("suite room") }
    ],
    meals: [
      { mealId: "m21", mealName: "Pork Vindaloo", mealType: "Lunch / Dinner", mealPrice: "₹800", mealDescription: "Spicy Goan pork vindaloo.", image: getRandomUnsplash("pork vindaloo") },
      { mealId: "m22", mealName: "Prawn Balchão", mealType: "Dinner", mealPrice: "₹850", mealDescription: "Tangy and spicy prawn balchão.", image: getRandomUnsplash("prawn balchao") }
    ]
  },
  {
    hotelId: "h3",
    hotelName: "Planet Hollywood Beach Resort Goa",
    hotelCity: "Goa",
    hotelAddress: "Utorda Beach, South Goa",
    image: getRandomUnsplash("planet hollywood goa resort"),
    rooms: [
      { roomId: "r31", roomName: "Hollywood Themed Room", roomType: "Deluxe", price: "9000", availableRooms: 5, roomDescription: "Fun themed room inspired by Hollywood.", image: getRandomUnsplash("fun hotel room") },
      { roomId: "r32", roomName: "Premium Suite", roomType: "Suite", price: "15000", availableRooms: 2, roomDescription: "Luxurious suite with balcony and movie memorabilia.", image: getRandomUnsplash("hotel suite luxury") }
    ],
    meals: [
      { mealId: "m31", mealName: "Ros Omelette", mealType: "Breakfast", mealPrice: "₹350", mealDescription: "Egg omelette in spicy Goan gravy.", image: getRandomUnsplash("ros omelette goa") },
      { mealId: "m32", mealName: "Goan Bebinca", mealType: "Dessert", mealPrice: "₹300", mealDescription: "Traditional layered Goan dessert.", image: getRandomUnsplash("bebinca goa dessert") }
    ]
  }
];

// --- TripDetails Component ---
export const TripDetailsForPopup = ({ tripId, onClose }) => {
  const [step, setStep] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);

  useEffect(() => { setTimeout(() => setHotels(MOCKED_API_RESPONSE), 500); }, [tripId]);

  const handleSelectHotel = (hotel) => { setSelectedHotel(hotel); setStep(2); };
  const handleSelectRoom = (room) => { setSelectedRoom(room); setStep(3); };
  const handleToggleMeal = (meal) => {
    setSelectedMeals(prev => prev.some(m => m.mealId === meal.mealId) ? prev.filter(m => m.mealId !== meal.mealId) : [...prev, meal]);
  };
  const handleBack = () => setStep(prev => Math.max(1, prev - 1));
  const nextStep = () => setStep(prev => prev + 1);

  const renderStep = () => {
    if (!hotels.length) return <div className="text-center py-10">Loading Hotels...</div>;

    if (step === 1) return (
      <div>
        <h2 className="text-2xl font-bold mb-4">1. Select Hotel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map(h => (
            <div key={h.hotelId} className="border p-3 rounded-xl cursor-pointer hover:shadow-2xl transition transform hover:scale-[1.02]" onClick={() => handleSelectHotel(h)}>
              <img src={h.image} className="rounded-xl w-full h-40 object-cover mb-2" alt={h.hotelName}/>
              <h3 className="font-bold text-lg">{h.hotelName}</h3>
              <p className="text-gray-500 text-sm">{h.hotelAddress}</p>
            </div>
          ))}
        </div>
      </div>
    );

    if (step === 2 && selectedHotel) return (
      <div>
        <h2 className="text-2xl font-bold mb-4">2. Select Room - {selectedHotel.hotelName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedHotel.rooms.map(room => (
            <div key={room.roomId} className={`border p-3 rounded-xl cursor-pointer hover:shadow-lg transition transform hover:scale-[1.02] ${selectedRoom?.roomId===room.roomId?"border-green-500 bg-green-50":""}`} onClick={()=>handleSelectRoom(room)}>
              <img src={room.image} className="rounded-lg w-full h-32 object-cover mb-2" alt={room.roomName}/>
              <h3 className="font-semibold">{room.roomName}</h3>
              <p className="text-gray-500 text-sm">{room.roomDescription}</p>
              <p className="text-green-700 font-semibold">₹{room.price}</p>
              <p className="text-gray-400 text-sm">Available: {room.availableRooms}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="secondary" onClick={handleBack}>Back</Button>
          <Button onClick={nextStep} disabled={!selectedRoom}>Next</Button>
        </div>
      </div>
    );

    if (step === 3 && selectedHotel) return (
      <div>
        <h2 className="text-2xl font-bold mb-4">3. Choose Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedHotel.meals.map(meal => (
            <div key={meal.mealId} className={`border p-2 rounded-xl cursor-pointer hover:shadow-lg transition transform hover:scale-[1.02] ${selectedMeals.some(m=>m.mealId===meal.mealId)?"border-indigo-500 bg-indigo-50":""}`} onClick={()=>handleToggleMeal(meal)}>
              <img src={meal.image} className="rounded-lg w-full h-24 object-cover mb-1" alt={meal.mealName}/>
              <h4 className="font-semibold text-sm">{meal.mealName}</h4>
              <p className="text-gray-500 text-xs">{meal.mealDescription}</p>
              <p className="text-green-700 font-semibold">{meal.mealPrice}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="secondary" onClick={handleBack}>Back</Button>
          <Button onClick={nextStep}>Next</Button>
        </div>
      </div>
    );

    if (step === 4 && selectedRoom) {
      const totalMeals = selectedMeals.reduce((acc, m) => acc + parseInt(m.mealPrice.replace("₹","")), 0);
      const totalRoom = parseInt(selectedRoom.price);
      const grandTotal = totalRoom + totalMeals;
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">4. Review & Confirm</h2>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
            <p><strong>Hotel:</strong> {selectedHotel.hotelName}</p>
            <p><strong>Room:</strong> {selectedRoom.roomName} - ₹{selectedRoom.price}</p>
            <p><strong>Meals:</strong> {selectedMeals.length ? selectedMeals.map(m=>`${m.mealName} (${m.mealPrice})`).join(", ") : "None"}</p>
            <p className="font-bold text-lg">Grand Total: ₹{grandTotal}</p>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="secondary" onClick={handleBack}>Back</Button>
            <Button onClick={()=>{alert("Booking Confirmed!"); onClose();}}>Confirm</Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 text-sm font-medium">
        {["Hotel", "Room", "Meals", "Review"].map((s,i)=>(
          <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${step===i+1?"bg-indigo-600 text-white shadow-md":"bg-gray-200 text-gray-500"}`}>
            Step {i+1}: {s}
          </span>
        ))}
      </div>
      {renderStep()}
    </div>
  );
};

// --- Demo App ---
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Goa Trip Planner</h1>
      <Button onClick={()=>setIsOpen(true)}>
        <Icon name="Plane" size={20} className="mr-2" /> Start Planning
      </Button>
      <ModalWrapper isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <TripDetailsForPopup tripId="T001" onClose={()=>setIsOpen(false)} />
      </ModalWrapper>
    </div>
  );
};

export default App;
