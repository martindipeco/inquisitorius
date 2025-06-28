import { motion } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface TabNavigationProps {
  items: TabItem[];
  onItemClick: (itemId: string) => void;
}

export const TabNavigation = ({ items, onItemClick }: TabNavigationProps) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4">
        <div className="flex md:justify-center space-x-6 overflow-x-auto scrollbar-hide">
          {items.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`relative flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                item.active
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileHover={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                transition: { duration: 0.1 }
              }}
            >
              <div className="flex-shrink-0 w-5 h-5">
                {item.icon}
              </div>
              <span>{item.label}</span>
              {item.active && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="activeTab"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}; 