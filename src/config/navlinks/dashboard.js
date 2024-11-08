export const navLinks = {
    employer: [
        {
            name: "Dashboard",
            url: "/dashboard/employer"
        },
        {
            name: "Employees",
            url: "/employees"
        },
        {
            name: "Payroll",
            url: "/payroll"
        },
        {
            name: "Report Summary",
            url: "/reportsummary",
            subItems: [
                {
                    name: "Summary",
                    url: "/reportsummary/summary"
                },
                {
                    name: "Variance",
                    url: "/reportsummary/variance"
                },
                {
                    name: "General",
                    url: "/reportsummary/general"
                },
                {
                    name: "Paye Output",
                    url: "/reportsummary/payeoutput"
                },
                {
                    name: "Pension Output",
                    url: "/reportsummary/pensionoutput"
                },
            ]
        },
        {
            name: "Setup",
            url: "/payrollsettings"
        },
        {
            name: "Logout",
            url: ""
        },
    ],
    employee: [
        {
            name: "Dashboard",
            url: "/dashboard/employee"
        },
        {
            name: "My Profile",
            url: "/profile"
        },
        {
            name: "Settings",
            url: "/settings"
        },
    ],
    admin: [
        {
            name: "Dashboard",
            url: "/dashboard/admin"
        },
        {
            name: "Analytics",
            url: "/analytics"
        },
    ]
};