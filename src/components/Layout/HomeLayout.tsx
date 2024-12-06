import { ReactNode } from "react";

interface HomeLayoutProps {
	children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return <div className="flex-1 overflow-x-hidden">{children}</div>;
}
