interface NavItemProps {
  icon: string;
  label: string;
  action: () => void;
}

export function NavItem({ icon, label, action }: NavItemProps) {
  return (
    <button
      onClick={action}
      className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
} 