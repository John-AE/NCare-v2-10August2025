/**
 * Main Layout Component
 * 
 * Provides the common layout structure for all authenticated pages in the application.
 * Includes:
 * - Header with branding and user information
 * - Logout functionality
 * - Breadcrumb navigation
 * - Footer with copyright information
 * 
 * This layout is automatically applied to all protected routes through the ProtectedRoute component.
 * 
 * @author NCare Nigeria Development Team
 */

import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthProvider";
import { AppBreadcrumb } from "./AppBreadcrumb";
import { Stethoscope } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component Implementation
 * 
 * Creates a consistent layout structure with header, main content area, and footer.
 * Manages user authentication state and provides logout functionality.
 */
const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, signOut } = useAuth();

  /**
   * Handles user logout process
   * - Signs out the user through the AuthProvider
   * - Shows success/error notification
   * - Redirects to home page
   */
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
      });
      navigate("/");
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "Logged Out",
        description: "You have been logged out.",
        variant: "default"
      });
      navigate("/");
    }
  };

  /**
   * Converts user role codes to display-friendly names
   * @param role - The user's role code from the database
   * @returns Human-readable role name for display
   */
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "doctor": return "Doctor";
      case "nurse": return "Nurse";
      case "finance": return "Finance Staff";
      case "pharmacy": return "Pharmacy Staff";
      case "laboratory": return "Laboratory Staff";
      case "admin": return "Administrator";
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold" style={{ color: "#a3ff00", fontFamily: "Inter, sans-serif" }}>NCare Nigeria</h1>

                <p
                  className="text-sm"
                  style={{
                    fontFamily: "Sansita, sans-serif",
                    color: "#6c757d", // or change this to another color you like
                    letterSpacing: "0.5px"
                  }}
                >
                  {getRoleDisplayName(profile?.role || "")} Portal
                </p>

              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{profile?.username}</p>
                <p className="text-xs text-muted-foreground">{getRoleDisplayName(profile?.role || "")}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppBreadcrumb />
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-muted-foreground">
            <p style={{ fontFamily: "Sansita, sans-serif" }}>&copy; 2025 NCare Nigeria. Designed for Nigerian Healthcare.</p>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;