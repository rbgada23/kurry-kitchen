import React from 'react';
import KitchenHeader from './KitchenHeader';
import KitchenSidebar from './KitchenSidebar';
import useKitchen from '../../hooks/useKitchen';

const KitchenLayout = ({ children }) => {
  useKitchen();
  return (
    <div className="bg-slate-50 h-screen flex flex-col">
      <div className="h-16 w-full">
        <KitchenHeader />
      </div>

      <div className="flex flex-1">
        <div className="bg-custom-green h-full w-64">
          <KitchenSidebar />
        </div>
        <div className="flex-1 p-6 h-96">
          {children}
        </div>
      </div>
    </div>
  );
};

export default KitchenLayout;
