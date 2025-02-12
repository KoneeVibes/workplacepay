export const navLinks = {
  employer: [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Employees",
      url: "/employees",
    },
    {
      name: "Payroll",
      url: "/payroll",
    },
    {
      name: "Departments",
      url: "/departments",
    },
    {
      name: "Report Summary",
      url: "/reportsummary",
      subItems: [
        {
          name: "Summary",
          url: "/reportsummary/summary",
        },
        {
          name: "Variance",
          url: "/reportsummary/variance",
        },
        {
          name: "General",
          url: "/reportsummary/general",
        },
        {
          name: "Paye Output",
          url: "/reportsummary/payeoutput",
        },
        {
          name: "Pension Output",
          url: "/reportsummary/pensionoutput",
        },
      ],
    },
    {
      name: "Payroll Setup",
      url: "/payrollsettings",
    },
  ],
  employee: [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "My Profile",
      url: "/profile",
    },
    {
      name: "Password Reset",
      url: "/resetpassword",
    },
  ],
  admin: [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Analytics",
      url: "/analytics",
    },
  ],
};

export const navAvatarAreaLinks = {
  employer: [
    {
      name: "Add new company",
      url: "/setup",
    },
    {
      name: "Switch company",
      url: "/switchcompany",
    },
    {
      name: "Password Reset",
      url: "/resetpassword",
    },
    {
      name: "Logout",
      url: "/",
    },
  ],
  employee: [
    {
      name: "Logout",
      url: "/",
    },
  ],
  admin: [
    {
      name: "Logout",
      url: "/",
    },
  ],
};
