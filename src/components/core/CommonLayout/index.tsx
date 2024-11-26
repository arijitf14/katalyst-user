import React, { useState } from "react";
import "./CommonLayout.css";
import Dashboard from "@assets/svg/dashboard.svg?react";
import Transaction from "@assets/svg/transaction.svg?react";
import Echeck from "@assets/svg/echeck.svg?react";
import Reports from "@assets/svg/reports.svg?react";
import Bank from "@assets/svg/bank.svg?react";
import Payee from "@assets/svg/payee.svg?react";
import Logout from "@assets/svg/logout.svg?react";
import logo from "@assets/images/FusionNav.png";
import { ROUTES } from "@utils/Utils";
import Header from "../Header";

const LayoutHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [selected, setSelected] = useState<string>(ROUTES.DASHBOARD); // Default selected route

    const toggleSidebar = () => setSidebarVisible((prev) => !prev);
    const hideSidebar = () => setSidebarVisible(false);

    const handleSelection = (route: string) => {
      setSelected(route);
      hideSidebar();
    };

    const isSelected = (route: string) => route === selected;

    return (
      <div className="layout-container">
        {/* Sidebar */}
        <nav
          className={`sidebar-custom ${
            isSidebarVisible ? "visible" : "collapsed"
          }`}
        >
          <ul className="nav d-flex justify-content-center">
            <img src={logo} alt="Side Graphic" className="nav-logo" />
          </ul>
          <ul className="nav flex-column px-4 mt-6">
            <li
              className={`nav-item d-flex align-items-center mb-3 ${
                isSelected(ROUTES.DASHBOARD) ? "selected" : ""
              }`}
            >
              <Dashboard />
              <a
                className="nav-link text-white"
                href={ROUTES.DASHBOARD}
                onClick={() => handleSelection(ROUTES.DASHBOARD)}
              >
                My Dashboard
              </a>
            </li>
            <li
              className={`nav-item d-flex align-items-center mb-3 ${
                isSelected("#transaction-history") ? "selected" : ""
              }`}
            >
              <Transaction />
              <a
                className="nav-link text-white"
                href="#transaction-history"
                onClick={() => handleSelection("#transaction-history")}
              >
                Transaction History
              </a>
            </li>
            <li
              className={`nav-item d-flex align-items-center mb-3 ${
                isSelected("#create-check") ? "selected" : ""
              }`}
            >
              <Echeck />
              <a
                className="nav-link text-white"
                href="#create-check"
                onClick={() => handleSelection("#create-check")}
              >
                Create E-check
              </a>
            </li>
            <li className="nav-item d-flex align-items-center mb-3">
              <Echeck />
              <a
                className="nav-link text-white"
                href="#create-check"
                onClick={hideSidebar}
              >
                Receive E-check
              </a>
            </li>
            <li className="nav-item d-flex align-items-center mb-3">
              <Echeck />
              <a
                className="nav-link text-white"
                href="#create-check"
                onClick={hideSidebar}
              >
                E-check Drafts
              </a>
            </li>
            <li className="nav-item d-flex align-items-center mb-3">
              <Reports />
              <a
                className="nav-link text-white"
                href="#reports"
                onClick={hideSidebar}
              >
                Reports
              </a>
            </li>
            <li className="nav-item d-flex align-items-center mb-3">
              <Bank />
              <a
                className="nav-link text-white"
                href="#manage-sponsor-bank"
                onClick={hideSidebar}
              >
                Manage Sponsor Bank
              </a>
            </li>
            <li className="nav-item d-flex align-items-center mb-3">
              <Payee />
              <a
                className="nav-link text-white"
                href="#manage-payee"
                onClick={hideSidebar}
              >
                Manage Payee
              </a>
            </li>
            <li className="nav-item d-flex align-items-center mb-3">
              <Reports />
              <a
                className="nav-link text-white"
                href="#manage-subscription"
                onClick={hideSidebar}
              >
                Manage Subscription
              </a>
            </li>
            <hr style={{ borderTop: "2px solid #2096f3", margin: "20px 0" }} />
            <li
              className={`nav-item d-flex align-items-center mb-3 ${
                isSelected("#logout") ? "selected" : ""
              }`}
            >
              <Logout />
              <a
                className="nav-link text-white"
                href="#logout"
                onClick={() => handleSelection("#logout")}
              >
                Log Out
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className={`main-content ${isSidebarVisible ? "" : "collapsed"}`}>
          {/* Sidebar Toggle Button */}
          <button
            className="btn btn-primary d-md-none toggle-sidebar"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <Header />
          <WrappedComponent {...props} />
        </main>
      </div>
    );
  };
};

export default LayoutHOC;
