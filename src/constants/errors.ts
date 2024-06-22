import { i18n } from "@/plugins/i18n";

export const ErrorCodes = {
  General: {
    Unknown: "1000",
    DeadlineExceeded: "1001",
    NotFound: "1002",
    AlreadyExists: "1003",
    BadRequest: "1004",
    Internal: "1005",
    PermissionDenied: "1006",
    PaginationBadSortBy: "1100",
  },

  TaskService: {
    ScenarioInstanceAlreadyExists: "2000",
    ScenarioInstanceNotFound: "2001",
    ScenarioDeleted: "2002",
    ScenarioClosed: "2003",
    ScenarioClosedOrPaused: "2004",
    ScenarioWrongType: "2005",
    ScenarioEmptyAssigneeList: "2006",
    ScenarioEmptyAssignee: "2007",
    ScenarioInvalidAssigneeData: "2008",
    ScenarioDoesNotHaveSellers: "2009",
    ScenarioWrongProfileType: "2010",
    ScenarioIsOnPause: "2011",
    ScenarioIsNotOnPause: "2012",
    ScenarioEmptyPauseReason: "2013",
    ScenarioEmptyPauseComment: "2014",
    ScenarioEmptyCloseReason: "2015",
    ScenarioBothCloseReason: "2016",
    ScenarioBadCloseSubReason: "2017",
    ScenarioEmptyCloseComment: "2018",
    ScenarioMultiCreationConstraint: "2019",

    StepInstancesNotFound: "2101",
    StepsNotFound: "2102",
    StepNotFound: "2103",
    StepForwardFailure: "2104",
    StepBackwardFailure: "2105",
    AllStepsMustBeFinished: "2106",

    TaskEmptyList: "2200",
    TaskWrongType: "2201",
    TaskEmptyAssigneeList: "2202",
    TaskEmptyAssignee: "2203",
    TaskClosed: "2204",
    TaskEmptyDiscussionTopic: "2205",
    TaskEmptyFailureReasons: "2206",

    ConditionsNotFound: "2300",
    ConditionProcessFailure: "2301",

    TaskServiceUserBadRoles: "2400",
    TaskServiceUserEmptyEmail: "2401",

    TaskServiceQuestionnaireNotAllFormInstancesAreFilled: "2501",
  },

  HierarchyService: {
    UserBadRoles: "3000",
    UserIsAgent: "3001",
    UserLoginExists: "3002",
    UserDoNotHaveTelephony: "3003",
    UserSyncFromStaff: "3004",
    UserDoNotHaveStaff: "3005",
    UserAlreadyExists: "3006",
    UserEachOtherManager: "3007",
    UserGeneratePassword: "3008",

    SipDomainLoadFailure: "3100",
    WrongEnforcerArguments: "3101",
    CalculateGroupTableHash: "3102",
    CalculatePolicyTableHash: "3103",

    TelephonyCloudSubscriberExists: "3200",
    TelephonyUserIDExists: "3201",
  },

  DataService: {
    ProfileNotFound: "4000",
    ProfileIdAlreadyExists: "4001",
    BoAccommodationIdAlreadyExists: "4002",
    AccommodationObjectsSrIdAlreadyExists: "4003",
    ContactPhoneAlreadyExists: "4004",
    ContactEmailAlreadyExists: "4005",
    ContactOzonIdAlreadyExists: "4006",
    OrganizationInnAlreadyExists: "4007",
    MetazonIdAlreadyExists: "4008",
    MetazonContractorSellerIdAlreadyExists: "4009",
    OrganizationGlobalRegistrationNumberAlreadyExists: "4010",
    SellerServiceIdAlreadyExists: "4011",
    OrganizationInnLength: "4012",
    OrganizationInnMustHaveOnlyDigits: "4013",
    TechContractNumberAlreadyExists: "4014",
  },

  CommunicationsService: {
    SubscriberOffline: "5000",
  },

  ApplicationService: {
    ApplicationWrongType: "6000",
    ApplicationNoLinkedEntity: "6001",
    ApplicationWrongStatus: "6002",
    ApplicationAlreadyExists: "6003",
    ApplicationCancelBadPermissions: "6004",
    ApplicationCreateBadPermissions: "6005",

    AppServiceApproverAlreadyProcessed: "6020",

    AppServiceScenarioClosed: "6050",
    AppServiceScenarioEmptyAssignee: "6051",
    AppServiceScenarioSameReassignee: "6052",

    AppServiceInvalidRevertDate: "6060",
    AppServiceNoSubstituteDouble: "6061",
    AppServiceInvalidSpecificSubstitutes: "6062",
    AppServiceInvalidAssignDate: "6063",
    AppServiceScenarioProfileExists: "6064",
    AppServiceNoScenariosToReassign: "6065",
  },

  FormService: {
    PrivateQuestionnaireElement: "6100",
    SurveyIsNotFilled: "6101",
  },

  PlanningService: {
    PlanningServicePermissionDenied: "6200",
    PlanningServiceValidationFailed: "6201",
    PlanningServiceBadQuarter: "6202",
    PlanningServiceDenyPreviousQuarter: "6203",
    PlanningServiceOnlyCurrentQuarter: "6204",
    PlanningServiceHasActivePlan: "6205",
    PlanningServiceHasPlanItemDuplicate: "6206",
    PlanningServiceBadPlanStatus: "6207",
    PlanningServiceBadPlanItemStatus: "6208",
    PlanningServiceNoSellerForParentId: "6209",
    PlanningServiceScenarioInstanceOtherAlreadyExists: "6210",
    PlanningServiceSupplierIDAlreadyExists: "6211",
    PlanningServiceSupplierQuarterAlreadyExists: "6212",
  },
} as const;

const E = {
  ...ErrorCodes.General,
  ...ErrorCodes.DataService,
  ...ErrorCodes.HierarchyService,
  ...ErrorCodes.TaskService,
  ...ErrorCodes.CommunicationsService,
  ...ErrorCodes.ApplicationService,
  ...ErrorCodes.FormService,
  ...ErrorCodes.PlanningService,
};

export const DefaultErrorMessages = () => ({
  // General
  [E.Unknown]: i18n.global.t("common.errors.unknown"),

  // Accommodation object
  [E.BoAccommodationIdAlreadyExists]: i18n.global.t(
    "accommodation-object.create.bo-accommodation-id-error"
  ),
  [E.MetazonContractorSellerIdAlreadyExists]: i18n.global.t(
    "accommodation-object.create.metazon-contractor-id-error"
  ),
  [E.AccommodationObjectsSrIdAlreadyExists]: i18n.global.t(
    "accommodation-object.create.sr-id-error"
  ),

  // Contact
  [E.ContactEmailAlreadyExists]: i18n.global.t("contact.create.email-error"),
  [E.ContactPhoneAlreadyExists]: i18n.global.t("contact.create.phone-error"),

  // Organization
  [E.OrganizationInnAlreadyExists]: i18n.global.t(
    "organization.create.inn-error"
  ),
  [E.MetazonIdAlreadyExists]: i18n.global.t(
    "organization.create.metazon-id-error"
  ),

  // Organization global
  [E.OrganizationGlobalRegistrationNumberAlreadyExists]: i18n.global.t(
    "organization-global.create.registration-number-error"
  ),

  // Tech contract
  [E.TechContractNumberAlreadyExists]: i18n.global.t(
    "tech-contract.create.number-error"
  ),

  // Scenario
  [E.ScenarioInstanceAlreadyExists]: i18n.global.t(
    "scenario.create.error-has-assigned"
  ),
  [E.ScenarioMultiCreationConstraint]: i18n.global.t(
    "scenario.create.error-duplicate"
  ),
  [E.ScenarioDoesNotHaveSellers]: i18n.global.t("sc-access.status.no-sellers"),

  // Tasks
  [E.TaskServiceQuestionnaireNotAllFormInstancesAreFilled]: i18n.global.t(
    "task.close.error-questionnaire-not-filled"
  ),

  // Communication
  [E.SubscriberOffline]: i18n.global.t("telephony.call.error.offline"),

  // Application
  [E.ApplicationWrongStatus]: i18n.global.t(
    "application.actions.create.status-has-been-changed"
  ),
  [E.ApplicationCreateBadPermissions]: i18n.global.t(
    "application.actions.bad-permissions-error"
  ),
  [E.AppServiceApproverAlreadyProcessed]: i18n.global.t(
    "application.actions.create.already-processed-error"
  ),
  [E.AppServiceScenarioClosed]: i18n.global.t(
    "application.actions.create.scenario-closed-error"
  ),
  [E.AppServiceScenarioSameReassignee]: i18n.global.t(
    "application.actions.create.same-reassignee-error"
  ),
  [E.AppServiceInvalidRevertDate]: i18n.global.t(
    "application.actions.create.intersecting-dates"
  ),
  [E.AppServiceNoSubstituteDouble]: i18n.global.t(
    "application.actions.create.intersecting-dates"
  ),
  [E.AppServiceInvalidSpecificSubstitutes]: i18n.global.t(
    "application.actions.create.intersecting-dates"
  ),
  [E.AppServiceInvalidAssignDate]: i18n.global.t(
    "application.actions.create.intersecting-dates"
  ),
  [E.AppServiceScenarioProfileExists]: i18n.global.t(
    "application.actions.create.scenario-profile-exists"
  ),
  [E.AppServiceNoScenariosToReassign]: i18n.global.t(
    "application.actions.create.no-scenarios-to-reassign"
  ),

  // Planning
  [E.PlanningServiceHasActivePlan]: i18n.global.t(
    "planning.error.has-active-plan"
  ),
  [E.PlanningServiceBadPlanStatus]: i18n.global.t(
    "planning.error.bad-plan-status"
  ),
  [E.PlanningServicePermissionDenied]: i18n.global.t(
    "planning.error.permissions-denied"
  ),
  [E.PlanningServiceBadQuarter]: i18n.global.t("planning.error.bad-quarter"),
  [E.PlanningServiceBadPlanItemStatus]: i18n.global.t(
    "planning.error.bad-entry-status"
  ),
  [E.PlanningServiceDenyPreviousQuarter]: i18n.global.t(
    "planning.error.previous-quarter"
  ),
  [E.PlanningServiceOnlyCurrentQuarter]: i18n.global.t(
    "planning.error.current-quarter"
  ),
  [E.PlanningServiceValidationFailed]: i18n.global.t(
    "planning.error.invalid-inn"
  ),
  [E.PlanningServiceNoSellerForParentId]: i18n.global.t(
    "planning.error.no-seller-for-parent-id"
  ),
  [E.PlanningServiceScenarioInstanceOtherAlreadyExists]: i18n.global.t(
    "planning.error.scenario-already-exists"
  ),
  [E.PlanningServiceSupplierIDAlreadyExists]: i18n.global.t(
    "planning.error.supplier-id-already-exists"
  ),
  [E.PlanningServiceSupplierQuarterAlreadyExists]: i18n.global.t(
    "planning.error.has-active-plan"
  ),
});

export const DefaultNotificationTypes: Partial<
  Record<(typeof E)[keyof typeof E], string>
> = {
  [E.ScenarioInstanceAlreadyExists]: "warning",
  [E.ScenarioMultiCreationConstraint]: "warning",
};
