export const navLinks = [
    {
        name: "Dashboard",
        url: "/dashboard"
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
];