import styled from "styled-components";
import { Row } from "../../../../components/flex/styled";

export const EmployerProfileWrapper = styled("div")(() => {
    return {
        backgroundColor: "#FFFFFF",
        borderRadius: "1rem",
        padding: "var(--cardPadding)",
        overflow: "hidden",
        minHeight: "100vh",
        "& input, & select, & textarea": {
            padding: "calc(var(--cardPadding) / 4) var(--cardPadding)",
            outline: "none",
            backgroundColor: "transparent",
            border: "1px solid #000000",
            borderRadius: "8px",
            fontWeight: "400",
        },
        "& label": {
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#000000",
            marginBlockEnd: "calc(var(--sectionMargin)/2)"
        },
        "& fieldset": {
            flex: 1,
            overflow: "hidden",
        },
        "& .employer-profile-submit-button-box": {
            paddingTop: "var(--cardPadding)",
            overflow: "hidden"
        },
        "& .company-profile-submit-button-box": {
            paddingTop: "calc(var(--cardPadding)/2)",
            overflow: "hidden",
            "@media screen and (min-width: 768px)": {
                marginLeft: "auto",
            },
        },
        "& .payment-modal": {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFFFF",
            padding: "calc(var(--cardPadding) * 1)",
            borderRadius: "1rem",
            boxShadow: "0px 20px 24px -4px #10182814",
            "& .payment-form": {
                alignItems: "unset",
                justifyContent: "unset",
                padding: "unset"
            },
            "@media screen and (max-width: 425px)": {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transform: "unset",
                borderRadius: 0,
            }
        },
        "& .employer-headshot": {
            width: "100%",
            height: "auto",
            borderRadius: "50%",
            "@media screen and (min-width: 280px)": {
                width: "150px",
                height: "150px"
            },
        },
        "& .employer-profile-image-area": {
            padding: "0 0 var(--cardPadding) 0",
            margin: "0 0 var(--cardPadding) 0",
            borderBottom: "4px solid #CCCCCC",
            "& .employer-profile-image-action-area": {
                alignItems: "center",
                overflow: "hidden",
                "@media screen and (min-width: 768px)": {
                    flexDirection: "row"
                }
            },
        },
        "& .edit-icon": {
            position: "relative",
            top: "-3.5rem",
            left: "-1rem",
            cursor: "pointer",
        },
        "& .tab-area": {
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#D9D9D9",
            borderRadius: "5px",
            zIndex: 1,
            gap: 0,
            "& .tab": {
                cursor: "pointer",
                overflow: "hidden",
                userSelect: "none",
                transition: "background-color 0.3s",
                "& h2": {
                    marginBlock: 0,
                    fontWeight: 500,
                    fontSize: "24px",
                    color: "#00000070",
                    "@media screen and (max-width: 768px)": {
                        fontSize: "16px",
                    },
                },
            },
            "@media screen and (max-width: 1024px)": {
                top: "8.125rem",
                "& .tab": {
                    padding: "calc(var(--cardPadding)/4) calc(var(--cardPadding)/2)",
                }
            },
            "@media screen and (min-width: 769px) and (max-width: 1023px)": {
                top: "9.125rem",
                "& .tab": {
                    padding: "calc(var(--cardPadding)/4) calc(var(--cardPadding)* 2)",
                }
            },
            "@media screen and (min-width: 1024px)": {
                top: "10px",
                "& .tab": {
                    padding: "calc(var(--cardPadding)/4) calc(var(--cardPadding)* 2)",
                }
            },
            "@media screen and (max-width: 363px)": {
                position: "relative",
                top: 0,
                overflow: "hidden",
            },
        },
        "& .upper-section-company-details": {
            padding: "var(--cardPadding) 0",
            borderBottom: "4px solid #CCCCCC",
            display: "flex",
            flexDirection: "column",
            "& form": {
                display: "flex",
                gap: "calc(var(--flexGap) / 2)",
                flexDirection: "column",
                "& label": {
                    whiteSpace: "nowrap",
                },
                "& .company-logo": {
                    width: "100%",
                    height: "auto",
                    borderRadius: "50%",
                },
                "& .edit-icon": {
                    position: "relative",
                    top: "-2rem",
                    left: "2rem",
                    cursor: "pointer",
                },
                "@media screen and (min-width: 768px)": {
                    flexDirection: "row",
                    alignItems: "center",
                    "& .edit-icon": {
                        position: "relative",
                        top: "unset",
                        left: "-2rem",
                    },
                },
                "@media screen and (min-width: 280px)": {
                    "& .company-logo": {
                        width: "150px",
                        height: "150px"
                    }
                },
            },
            "& .payroll-plan": {
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                alignItems: "center",
                "& p": {
                    fontWeight: 500,
                    marginBlock: 0,
                },
                "@media screen and (max-width: 600px)": {
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "calc(var(--flexGap)/4)",
                    overflow: "hidden",
                }
            },
            "& .small-select": {
                width: "150px",
                height: "32px",
                fontSize: "14px",
                padding: "4px 8px",
                backgroundColor: "#D3D3D3",
                "@media screen and (max-width: 600px)": {
                    width: "100%"
                }
            },
            "@media screen and (max-width: 600px)": {
                gap: "calc(var(--flexGap) / 2)",
            }
        },
        "& .lower-section-company-details": {
            padding: "2rem 0",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            "& span": {
                fontWeight: 500,
            },
            "@media screen and (max-width: 1024px)": {
                "& .cardRow": {
                    gap: 0,
                },
            },
        },
    }
});

export const ProfileRow = styled(Row)(() => {
    return {
        justifyContent: "space-between",
        "@media screen and (max-width: 768px)": {
            gap: "calc(var(--flexGap)*1.5)",
            flexDirection: "column",
        },
    };
});
