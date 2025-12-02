// 统一存放 enum, 方便管理

// common
// 字典类型枚举
export const DictType = {
  VOUCHER_DISCOUNT: 'voucher_discount',
  VOUCHER_STATUS: 'voucher_status',
  VOUCHER_TRANSACTION_TYPE: 'voucher_transaction_type',
  WALLET_TRANSACTION_TYPE: 'wallet_transaction_type',
  AUDIT_STATUS: 'supplier_audit_status', // 通用审核状态 pending - 待审核 approved - 审核通过 rejected - 审核拒绝 draft - 草稿
} as const

// 通用查询所有值
export const QueryAll = ''

export const AuditStatus = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected',
  Draft: 'draft',
} as const

// case
// 案例列表审核状态tab枚举
export const CaseAuditStatus = {
  ...AuditStatus,
} as const

// 案例媒体类型枚举
export const CaseMediaType = {
  Image: 'image',
  Video: 'video',
  VideoLink: 'video_link',
} as const

// user
// 登录方式
export const LoginTypeEnum = {
  PASSWORD: 0,
  MOBILE: 1,
  REGISTER: 2,
} as const
// 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
export const LoginType = {
  LOGIN: 0,
  PHONE: 1,
  QR_CODE: 2,
  REGISTER: 3,
  FORGET_PASSWORD: 4,
} as const

// 头像类型枚举
export const AvatarType = {
  PERSONAL: 0,
  COMPANY: 1,
  USER: 2,
} as const

// 钱包交易类型枚举
export const VoucherType = {
  ALL: '',
  INCOME: 1,
  EXPENCE: 2,
} as const

// article
// 文章类型枚举
export const Articles = {
  PrecisionAcquisition: 0,
  OpportunityConversion: 1,
  EndToEndProjectDeliveryManagement: 2,
  FundsSafetySettlementSystem: 3,
  ProductSolutionCollection: 4,
  TechPartnerRecruitment: 5,
  KnowledgeCreatorGlobalExpansion: 6,
  OverseasProcurementAnnouncement: 7,
  NewProduct: 8,
  ProductList: 9,
  SolutionManagement: 10,
  BundleProductManagement: 11,
  MarketingCopyManagement: 12,
  RFQManagement: 13,
  OrderManagement: 14,
  SelectionDesignTool: 15,
  WalletManagement: 16,
  PartnerOnboarding: 17,
  UserGuide: 18,
  ProductEntryTemplate: 19,
  SolutionEntryTemplate: 20,
  ProductSpecTemplate: 21,
  TechSupportService: 22,
  AboutUs: 23,
  PlatformPromotionProduct: 24,
  TechnicalDocImprovement: 25,
  ProjectRequirementSurvey: 26,
  OnlineCustomer: 27,
  SiteSurveyConsultation: 28,
  CustomRequirementIssue: 29,
  OnsiteInstallationIssue: 30,
  AfterSalesServiceIssue: 31,
  DeliveryIssue: 32,
  SettlementPaymentPolicy: 33,
  IECustomsPolicy: 34,
  PreSales: 35,
} as const

export const BuyRequestType = {
  Product: '0',
  Solution: '1',
} as const

// 产品解决方案类型枚举
export const ProductSolutionType = {
  PRODUCT: 1,
  SOLUTION: 2,
} as const

// procurement
// 求购类型枚举
export const ProcurementType = {
  Product: 'product',
  Solution: 'solution',
} as const

// solution
// 解决方案列表审核状态 draft -> pending_first -> pending_perfect -> pending -> approved|rejected
export const SolutionAuditStatus = {
  ...AuditStatus,
  PendingFirst: 'pending_first',
  PendingPerfect: 'pending_perfect',
} as const

export type DictType = (typeof DictType)[keyof typeof DictType]
export type CaseAuditStatus = (typeof CaseAuditStatus)[keyof typeof CaseAuditStatus]
export type CaseMediaType = (typeof CaseMediaType)[keyof typeof CaseMediaType]
export type LoginTypeEnum = (typeof LoginTypeEnum)[keyof typeof LoginTypeEnum]
export type LoginType = (typeof LoginType)[keyof typeof LoginType]
export type AvatarType = (typeof AvatarType)[keyof typeof AvatarType]
export type VoucherType = (typeof VoucherType)[keyof typeof VoucherType]
export type Articles = (typeof Articles)[keyof typeof Articles]
export type BuyRequestType = (typeof BuyRequestType)[keyof typeof BuyRequestType]
export type ProductSolutionType = (typeof ProductSolutionType)[keyof typeof ProductSolutionType]
export type ProcurementType = (typeof ProcurementType)[keyof typeof ProcurementType]
export type AuditStatus = (typeof AuditStatus)[keyof typeof AuditStatus]
export type SolutionAuditStatus = (typeof SolutionAuditStatus)[keyof typeof SolutionAuditStatus]
