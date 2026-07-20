export const Permission = {

    // Checklist

    ChecklistView: "checklist.view",
    ChecklistCreate: "checklist.create",
    ChecklistEdit: "checklist.edit",
    ChecklistDelete: "checklist.delete",

    // Daily Report

    DailyReportView: "dailyReport.view",
    DailyReportCreate: "dailyReport.create",
    DailyReportEdit: "dailyReport.edit",
    DailyReportDelete: "dailyReport.delete",

    // Device

    DeviceView: "device.view",
    DeviceCreate: "device.create",
    DeviceEdit: "device.edit",
    DeviceDelete: "device.delete",

    // Branch

    BranchView: "branch.view",
    BranchCreate: "branch.create",
    BranchEdit: "branch.edit",
    BranchDelete: "branch.delete",

    // User

    UserView: "user.view",
    UserCreate: "user.create",
    UserEdit: "user.edit",
    UserDelete: "user.delete",

    // Dashboard

    DashboardView: "dashboard.view",

} as const;

export type PermissionType =
    typeof Permission[keyof typeof Permission];