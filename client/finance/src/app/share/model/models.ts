/**
 * Microfinance model interface fields
 * including User|Mfi, Stakeholder, Board members, Address,Reports
 * Admin Feedback and user Feedback
 */
// License Fields
export interface License{
    id: number;
    mfi_license: string;
    mfi_name: string;
}

// Microfinance fields
export interface Microfi {
    id: number;
    mfi_type: string;
    mfi_name: string;
    email: string;
    mfi_license: string;
    mfi_service: string;
    mfi_assets: string;
    mfi_liability: string;
    mfi_technology: string;
    token?: string;
    refreshToken?: string;
    is_superuser: boolean;
}

// Mfi stakeholder fields
export interface Stakeholder {
    id: number;
    stake_first_name: string;
    stake_middle_name: string;
    stake_last_name: string;
    stake_email: string;
    stake_phone_number: string;
    stake_citizenship: string;
    stake_share: string;
    stake_avatar: string;
}

// Mfi management fields
export interface Board {
    id: number;
    board_first_name: string;
    board_middle_name: string;
    board_last_name: string;
    board_email: string;
    board_phone_number: string;
    board_citizenship: string;
    board_position: string;
    board_avatar: string;
}

// Mfi address fields
export interface Address {
    id: number;
    address_office: string;
    addres_phone_number: string;
    address_website: string;
    address_pobox: string;
    address_district: string;
    address_region: string;
}

// Mfi report fields
export interface MfiReport {
    id: number;
    report_assets: string;
    report_liability: string;
    report_revenue: string;
    report_income: string;
    report_dividend: string;
}

// Admin feedback to Mfi
export interface AdminFeedback {
    id: number;
    admin_feedback: string;
}

// User feedback to system
export interface UserFeedback{
    id: number;
    user_email: string;
    user_first_name: string;
    user_last_name: string;
    user_feedback: string;
}
