export interface IAuthRequestResponse {
  nonce: string
}

export interface IAuthTokenResponse {
  jwtToken: string
  expiresAt: string
}

export interface LatestBlock {
  chainId: number
  lastBlockAck: number
}

export interface ISellerProfile {
  sellerAddress: string
  name?: string
  logoUrl?: string
  website?: string
  telegram?: string
  discord?: string
  twitter?: string
  imageBytes?: any
  defaultTokens?: AcceptedToken[]
}

export interface IDefaultToken {
  chainId: number
  tokenAddress: string
}

export type ICreateSellerProfile = Omit<ISellerProfile, 'logoUrl'> & {
  defaultTokens?: IDefaultToken[]
  imageBytes?: number[]
}

export interface IProductCreate {
  name: string
  description?: string
  sellerAddress: string
  addOns: Array<{ name: string, price: string }>
  chargingIntervalSeconds: number
  meteredChargingInterval?: number
  meteredBudget?: number
  currency: string
  price: number
  image?: number[]
  quantity?: number
}

export type IProductUpdate = Partial<IProductCreate> & { id: string }
export type IProduct = Omit<IProductCreate, 'image'> & {
  createdAt: string
  updatedAt: string
  id: string
  imageUrl: string
  isArchived: boolean
}

export interface ProductWithQuantity {
  product: IProduct
  quantity: number
}

export interface LineItem {
  invoiceId: string
  name: string
  quantity: number
  price: number
  currency?: string
}

export interface AcceptedToken {
  tokenAddress: string
  chainId: number
}

export enum InputFieldDataType {
  String = 'Text',
  Number = 'Number',
  Email = 'Email address'
}

export interface InputField {
  dataType: InputFieldDataType
  inputLabel: string
  isRequired: boolean
}

export type ICreateInputField = Omit<InputField, 'dataType'> & { dataType: string }

export interface IManagedGateway {
  methods: Array<{
    network: string
    token?: string
  }>
}

export interface ISelfCustodialGateway {
  tokens: AcceptedToken[]
}

export interface IPaymentLink {
  cancelUrl: string
  successUrl: string
  id: string
  products: IProduct[]
  gateway: {
    selfCustodial?: ISelfCustodialGateway
    managed?: IManagedGateway
  }
  url: string
  createdAt: Date
  updatedAt: Date
  customizations: Customization
  inputFields: InputField[]
}

export interface CheckoutItemData {
  name: string
  description?: string
  chargingIntervalSeconds: number
  price: number
  isMetered?: boolean
  currency: string
}

export interface CheckoutLineItem {
  productId?: string
  itemData?: CheckoutItemData

}

export interface ICreateCheckoutSession {
  gateway: {
    selfCustodial?: ISelfCustodialGateway
    managed?: IManagedGateway
  }
  currency?: string
  total?: number
  lineItems?: CheckoutLineItem[]
  customizations?: Customization
  cancelUrl?: string
  successUrl: string
}

export interface ICreateCheckoutSessionResult {
  checkoutSessionId: string
  checkoutSessionUrl: string
}

export interface ICheckoutSession {
  gateway: {
    selfCustodial?: ISelfCustodialGateway
    managed?: IManagedGateway
  }
  currency?: string
  total?: number
  sellerAddress: string
  cancelUrl?: string
  successUrl?: string
}

export interface Customization {
  leftPanelColor: string
  primaryButtonColor: string
  slantedEdge: boolean
  allowDiscountCodes: boolean
}

export interface ICreatePaymentLink {
  products: string[]
  customizations: Customization
  inputFields?: ICreateInputField[]
}

export interface IDiscountCode {
  id: string
  code: string
  model: any
  products: string[]
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  email: string
  name: string
  billingAddress?: string
  phone?: string
  telegram?: string
  discord?: string
}

export type ICreateCustomer = Omit<Customer, 'id'>

export interface Invoice {
  id: string
  sellerAddress: string
  seller?: ISellerProfile
  customer: Customer
  tokens: AcceptedToken[]
  products: ProductWithQuantity[]
  lineItems: LineItem[]
  issuedAt: Date
  paidAt?: Date
  voidedAt?: Date
  overdueAt?: Date
  inputData: Array<{ key: string, value: string }>
  status: 'paid' | 'pending' | 'voided' | 'overdue'
  memo?: string
  url: string
}

export interface InvoicePayment {
  id: string
  buyerAddress: string
  tokenAddress: string
  chainId: number
  orderHash: string
  orderInput: string
  createdAt: Date
  paidAt: Date
}

export type ICreateInvoice = Omit<Invoice, 'id' | 'customer' | 'issuedAt' | 'paidAt' | 'voidedAt' | 'status'> & { 'customerIds': string[] }
export type MultiCreateInvoice = Omit<ICreateInvoice, 'customerIds'> & { customers: Customer[], customer?: Customer }

export interface IToken {
  sessionId: string
  name: string
  token?: string
  createdAt: string
}

export interface IWebhook {
  id: string
  url: string
  sellerAddress: string
  verificationKey: string
  isPaused: boolean
  isOffline: boolean
  isDeleted: boolean
  createdTimestamp: string
  pausedTimestamp: string
  offlineSinceTimestamp: string
}

export interface IWebhookFailure {
  id: string
  webhookId: string
  sellerAddress: string
  subscriptionId: number
  messagePayload: string
  createdTimestamp: Date
  numRetries: number
  lastRetryTimestamp: Date
  httpStatusCode?: number
}

export interface IPermissionRole {
  id: string
  name: string
  sellerAddress: string
  permissions: string[]
  createdAt: string
  updatedAt: string
  users: string[]
}

export interface ILogEvent {
  sellerAddress: string
  chainId: number
  blockNumber: number
  blockTimestamp: string
  logMessage: string
}

export interface IPriceQuote {
  from: string
  to: string
  value: number
  expiryTimestamp: string
}

export interface WalletShare {
  id: string
  loginId: string
  loginType: string
  share: string
}

export interface ICheckoutSessionSummary {
  id: string
  sellerAddress: string
  total: number
  currency?: string
  successUrl: string
  cancelUrl?: string
  sessionStatus: 'pending' | 'success' | 'cancelled' | 'expired'
  expiresAt?: string
  createdAt: string
  updatedAt: string
  customizations: Customization
}

export interface PaymentLinkOrderData {
  id: string
  orderId: string
  key: string
  value: string
}

export interface PaymentLinkOrder {
  id: string
  paymentLinkId: string
  sellerAddress: string
  buyerAddress: string
  tokenAddress: string
  chainId: number
  createdAt: string
  paidAt: string
  orderData: PaymentLinkOrderData[]
}

export interface ManagedBalance {
  network: string
  token?: string
  balance: string
}

export interface WithdrawalRequestReceipt {
  EVMReceipt?: {
    transactionHash: string
  }
}

export interface WithdrawalRequest {
  id: string
  organizationId: string
  network: string
  token?: string
  withdrawalAmount: string
  withdrawalAddress: string
  requestedAt: string
  withdrawalStatus: string
  completedAt?: string
  receipt?: WithdrawalRequestReceipt
}

export type InputFieldWithValue = InputField & { value: string | number | boolean }

export interface IManagedPaymentMethod {
  network: string
  token?: string
}

export interface PriceQuote {
  from: string
  to: string
  value: number
  expiryTimestamp: string
}

export interface Profile {
  id: string
  email: string
  name: string
  billingAddress?: string
  phone?: string
  telegram?: string
  discord?: string
  logoUrl?: string
}

export type SellerProfile = Profile & { sellerAddress: string }

export interface IInvoice {
  id: string
  sellerAddress: string
  seller?: Profile
  customer: Profile
  tokens: AcceptedToken[]
  products: ProductWithQuantity[]
  lineItems: LineItem[]
  issuedAt: Date
  paidAt?: Date
  voidedAt?: Date
  overdueAt?: Date
  inputData: Array<{ key: string, value: string }>
  status: 'paid' | 'pending' | 'voided' | 'overdue'
  memo?: string
}

export interface KeyValuePair {
  key: string
  value: string
}

export interface CheckoutSession {
  id: string
  sessionStatus: string
  sellerAddress: string
  products: IProduct[]
  items: CheckoutItemData[]
  total?: number
  currency?: string
  gateway: {
    selfCustodial?: ISelfCustodialGateway
    managed?: IManagedGateway
  }
  successUrl: string
  cancelUrl?: string
  metadata?: KeyValuePair[]
  expiresAt?: Date
  createdAt?: Date
  updatedAt?: Date
  customizations?: any
}

export interface NewPendingPaymentLinkOrder {
  paymentLinkId: string
  paymentMethod: {
    selfCustodial?: {
      buyerAddress?: string
      tokenAddress?: string
      chainId: number
    }
    managed?: {
      method: IManagedPaymentMethod
    }
  }
  orderData: KeyValuePair[]
  orderProductData: any[]
}

export interface NewPendingCheckoutSessionOrder {
  checkoutSessionId: string
  paymentMethod: {
    selfCustodial?: {
      buyerAddress?: string
      tokenAddress?: string
      chainId: number
    }
    managed?: {
      method: IManagedPaymentMethod
    }
  }
  orderData: KeyValuePair[]
  orderProductData: any[]
}

export interface ICheckoutSessionOrder {
  id: string
  checkoutSessionId: string
  paymentMethodDetails: {
    managed?: IManagedPaymentMethodDetails
    selfCustodial?: {
      sellerAddress: string
      buyerAddress: string
      tokenAddress: string
      chainId: number
      orderHash: string
      orderInput: string
    }
  }
  createdAt: Date
}

export type INetwork = 'Bitcoin' | 'Ethereum' | 'Solana' | 'SepoliaTestnet' | 'Polygon' | 'PolygonTestnet' | 'BNB' | 'BNBTestnet'

export interface IManagedPaymentMethodDetails {
  paymentId: string
  paymentAddress: string
  network: INetwork
  token?: string
  amount: string
  expiresAt: string
}

export interface IPaymentLinkOrder {
  id: string
  paymentLinkId: string
  paymentMethodDetails: {
    managed?: IManagedPaymentMethodDetails
    selfCustodial?: {
      sellerAddress: string
      buyerAddress: string
      tokenAddress: string
      chainId: number
      orderHash: string
      orderInput: string
    }
  }
  orderTotal: number
  createdAt: string
}

export interface NewPendingInvoicePayment {
  invoiceId: string
  buyerAddress: string
  tokenAddress: string
  chainId: number
}

export interface IInvoicePayment {
  id: string
  invoiceId: string
  sellerAddress: string
  buyerAddress: string
  tokenAddress: string
  chainId: number
  orderHash: string
  orderInput: string
  createdAt: string
}

export interface IManagedPaymentStatus {
  isComplete: boolean
}

export interface NewPaymentSession {
  method: IManagedPaymentMethod
  total: number
  currency: string
}

export interface PaymentSession {
  id: string
  method: IManagedPaymentMethod
  total: number
  currency: string
  sessionStatus: 'pending' | 'success' | 'cancelled' | 'expired'
  paymentAddress: string
  expiresAt: string
  createdAt: string
}
