import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BookOpen, 
  LineChart, 
  Sparkles, 
  Menu, 
  X,
  User,
  Package
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { RoutinePlanner } from './components/RoutinePlanner';
import { KnowledgeHub } from './components/KnowledgeHub';
import { ProgressTracker } from './components/ProgressTracker';
import { AIAdvisor } from './components/AIAdvisor';
import { InventoryManager } from './components/InventoryManager';

// Navigation Items
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'routine', label: 'Routine Planner', icon: CalendarDays },
  { id: 'progress', label: 'Progress Tracking', icon: LineChart },
  { id: 'inventory', label: 'Product Stash', icon: Package },
  { id: 'knowledge', label: 'Knowledge Hub', icon: BookOpen },
  { id: 'ai-advisor', label: 'AI Diagnostic', icon: Sparkles },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'routine': return <RoutinePlanner />;
      case 'progress': return <ProgressTracker />;
      case 'inventory': return <InventoryManager />;
      case 'knowledge': return <KnowledgeHub />;
      case 'ai-advisor': return <AIAdvisor />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-peach-50 text-charcoal">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed md:relative z-50 flex flex-col w-64 h-full bg-white border-r border-peach-200 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-peach-300 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <h1 className="text-2xl font-bold text-charcoal tracking-tight">HairSphere</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-peach-300 text-white shadow-md shadow-peach-200' 
                    : 'text-softbrown hover:bg-peach-100 hover:text-peach-800'}
                `}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-peach-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-peach-50 border border-peach-200 cursor-pointer hover:bg-peach-100 transition-colors">
            <div className="w-10 h-10 rounded-full bg-peach-200 flex items-center justify-center text-peach-700">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-charcoal">Jane Doe</p>
              <p className="text-xs text-softbrown">Type 4C • High Porosity</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-peach-200">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-peach-300 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-lg">HairSphere</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} className="text-charcoal" />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto w-full">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
