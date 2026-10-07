import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SelectionPanel = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, deliveryDate, pickupDate } = useAppContext();

  const handleClose = () => setIsCartOpen(false);

  const calculateDays = () => {
    if (deliveryDate && pickupDate) {
      const diffTime = Math.abs(pickupDate - deliveryDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 1;
  };

  const rentalDays = calculateDays();
  const subtotal = cartItems.reduce((acc, item) => acc + (item.per_day_rent * rentalDays * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] transition-opacity"
          onClick={handleClose}
        ></div>
      )}

      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Your Selection</h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some gadgets to start your rental.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 pr-2">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-1">Rent for {rentalDays} days</div>
                    
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="font-bold text-gray-900">₹{item.per_day_rent * rentalDays * item.quantity}</div>
                      
                      <div className="flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2.5 py-1 hover:bg-gray-200 text-gray-700"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-sm font-semibold min-w-[24px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2.5 py-1 hover:bg-gray-200 text-gray-700"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-600">
              <span>Rental Duration</span>
              <span>{rentalDays} Day{rentalDays > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-lg font-bold text-gray-900">
              <span>Total Amount</span>
              <span>₹{subtotal}</span>
            </div>
            <button className="w-full bg-primary-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors text-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectionPanel;
