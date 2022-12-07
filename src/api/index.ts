import axios from 'axios'
import {
  ISellerProfile, IAuthTokenResponse, IAuthRequestResponse, IProduct,
  IDiscountCode, IProductUpdate, IProductCreate, IPaymentLink, ICreatePaymentLink,
  ICreateCustomer, Customer, MultiCreateInvoice, Invoice, ICreateInvoice,
  InvoicePayment, LatestBlock, IToken, IWebhook, IWebhookFailure, IPermissionRole,
  ILogEvent, IPriceQuote, ICheckoutSessionSummary, WalletShare,
  PaymentLinkOrder, ManagedBalance, WithdrawalRequest, ICreateCheckoutSession,
  ICreateCheckoutSessionResult, ICheckoutSessionOrder, IInvoicePayment,
  IManagedPaymentStatus, IPaymentLinkOrder, NewPendingCheckoutSessionOrder,
  NewPendingInvoicePayment, NewPendingPaymentLinkOrder, NewPaymentSession, PaymentSession
} from './types'

export interface RadomAPIOptions {
  token?: string
  url?: string
}

class RadomAPI {
  private readonly url: string
  private token = ''

  constructor(apiOptions?: RadomAPIOptions) {
    this.url = apiOptions?.url || 'https://api.radom.network'
    if (apiOptions?.token) this.token = apiOptions?.token
  }

  formatApiUrl = (endpoint: string): string => `${this.url}${endpoint}`

  renewToken = async (): Promise<void> => {
    const authRenewResponse: IAuthTokenResponse = await axios
      .post(this.formatApiUrl('/auth/renew'), null, {
        headers: {
          Authorization: this.token
        }
      })
      .then(res => res.data)

    this.token = authRenewResponse.jwtToken
  }

  requestAuth = async (address: string): Promise<IAuthRequestResponse> => {
    return await axios
      .post(this.formatApiUrl('/auth/request'), {
        address
      })
      .then(res => res.data)
  }

  verifyAuth = async(address: string, signedMessage: string): Promise<IAuthTokenResponse> => {
    return await axios
      .post(this.formatApiUrl('/auth/verify'), {
        address,
        signature: signedMessage
      })
      .then(async res => res.data)
  }

  getProducts = async (includeArchived: boolean): Promise<IProduct[]> => {
    return await axios.get(this.formatApiUrl('/products'), {
      headers: {
        Authorization: this.token
      },
      params: {
        include_archived: includeArchived
      }
    })
      .then(res => res.data)
  }

  listDiscountCodes = async (): Promise<IDiscountCode[]> => {
    return await axios.get(this.formatApiUrl('/discount_codes'), {
      headers: {
        Authorization: this.token
      }
    })
      .then(res => res.data)
  }

  getSellerProfile = async (addr: string): Promise<ISellerProfile> => {
    return await axios.get(this.formatApiUrl(`/sellers/${addr}`), {
      headers: {
        Authorization: this.token
      }
    })
      .then(res => res.data)
  }

  updateSellerProfile = async (profile: Partial<ISellerProfile>): Promise<void> => {
    await axios.put(
      this.formatApiUrl('/sellers/update'),
      profile,
      {
        headers: {
          Authorization: this.token,
          'Content-Type': 'application/json'
        }
      })
  }

  getProduct = async (productId: string): Promise<IProduct> => {
    return await axios.get(this.formatApiUrl(`/product/${productId}`), {
      headers: {
        Authorization: this.token
      }
    })
      .then(res => res.data)
  }

  updateProduct = async (productId: string, productInfo: IProductUpdate): Promise<IProduct> => {
    return await axios.put(this.formatApiUrl(`/product/${productId}`), productInfo, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  createProduct = async (productInfo: IProductCreate): Promise<IProduct> => {
    return await axios.post(this.formatApiUrl('/product/create'), productInfo, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  createPaymentLink = async (paymentLinkReq: IPaymentLink): Promise<IPaymentLink> => {
    const paymentLinkData: ICreatePaymentLink = {
      ...paymentLinkReq,
      products: paymentLinkReq.products.map(p => p.id)
    }
    return await axios.post(this.formatApiUrl('/payment_link/create'), paymentLinkData, {
      headers: {
        Authorization: this.token
      }
    })
  }

  createDiscountCode = async (discountCodeReq: {
    code: string
    products: string[]
    model: { modelType: string, amountOff: number }
  }): Promise<void> => {
    return await axios.post(this.formatApiUrl('/discount_code/create'), discountCodeReq, {
      headers: {
        Authorization: this.token
      }
    })
  }

  deleteDiscountCode = async (discountCodeId: string): Promise<void> => {
    return await axios.delete(this.formatApiUrl(`/discount_code/${discountCodeId}`), {
      headers: {
        Authorization: this.token
      }
    })
  }

  getPaymentLink = async (paymentLinkId: string): Promise<IPaymentLink> => {
    return await axios.get(this.formatApiUrl(`/payment_link/${paymentLinkId}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  getPaymentLinks = async (): Promise<IPaymentLink[]> => {
    return await axios.get(this.formatApiUrl('/payment_links'), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  updatePaymentLink = async (paymentLink: IPaymentLink, sellerAddress: string): Promise<IPaymentLink> => {
    return await axios.put(this.formatApiUrl(`/payment_link/update/${sellerAddress}/${paymentLink.id}`), paymentLink, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  deletePaymentLink = async (id: string): Promise<void> => {
    return await axios.delete(this.formatApiUrl(`/payment_link/${id}`), {
      headers: {
        Authorization: this.token
      }
    })
  }

  deleteProduct = async (id: string): Promise<void> => {
    return await axios.delete(this.formatApiUrl(`/product/${id}`), {
      headers: {
        Authorization: this.token
      }
    })
  }

  createCustomer = async (customerForm: ICreateCustomer, sellerAddress: string): Promise<Customer> => {
    const data = {
      sellerAddress,
      ...customerForm
    }
    return await axios.post(this.formatApiUrl('/customer'), data, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  getCustomer = async (id: string): Promise<Customer> => {
    return await axios.get(this.formatApiUrl(`/customer/${id}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  getSellerCustomers = async (sellerAddress: string): Promise<Customer[]> => {
    return await axios.get(this.formatApiUrl(`/sellers/${sellerAddress}/customers`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  createInvoice = async (data: MultiCreateInvoice, sellerAddress: string): Promise<Invoice> => {
    const invoiceData: ICreateInvoice = {
      ...data,
      customerIds: data.customers.map(c => c.id),
      sellerAddress,
      products: data.products.map(p => {
        return {
          ...p,
          quantity: Number(p.quantity),
          product: {
            ...p.product,
            price: Number(p.product.price)
          }
        }
      }),
      lineItems: data.lineItems.map(l => {
        return {
          ...l,
          quantity: Number(l.quantity),
          price: Number(l.price)
        }
      })
    }
    return await axios.post(this.formatApiUrl('/invoice'), invoiceData, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  getInvoice = async (id: string): Promise<Invoice> => {
    return await axios.get(this.formatApiUrl(`/invoice/${id}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => { return res.data })
  }

  getInvoicePayment = async (invoiceId: string): Promise<InvoicePayment> => {
    return await axios.get(this.formatApiUrl(`/invoice/payment/${invoiceId}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => { return res.data })
  }

  getSellerInvoices = async (sellerAddress: string): Promise<Invoice[]> => {
    return await axios.get(this.formatApiUrl(`/sellers/${sellerAddress}/invoices`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  voidInvoice = async (invoiceId: string): Promise<void> => {
    return await axios.delete(this.formatApiUrl(`/invoice/${invoiceId}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  updateLastBlockAck = async (data: {
    userAddress: string
    orgAddress: string
    latestBlockArray: LatestBlock[]
  }): Promise<void> => {
    return await axios.put(this.formatApiUrl('/notifications'), data, {
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
  }

  getLastBlockAck = async (data: {
    userAddress: string
    orgAddress: string
  }): Promise<LatestBlock[]> => {
    return await axios.get(this.formatApiUrl(`/notifications?userAddress=${data.userAddress}&orgAddress=${data.orgAddress}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  generateAPIToken = async (name: string): Promise<IToken> => {
    return await axios.post(this.formatApiUrl('/api_token'), { name }, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  deleteAPIToken = async (sessionId: string): Promise<void> => {
    return await axios.delete(this.formatApiUrl(`/api_token/${sessionId}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  listAPITokens = async (): Promise<IToken[]> => {
    return await axios.get(this.formatApiUrl('/api_tokens'), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  getWebhooks = async (addr: string): Promise<IWebhook[]> => {
    return await axios.get(this.formatApiUrl(`/sellers/${addr}/webhooks`), {
      headers: {
        Authorization: this.token
      }
    })
      .then(res => res.data)
  }

  getWebhook = async (id: string): Promise<IWebhook> => {
    return await axios.get(this.formatApiUrl(`/webhook/${id}`), {
      headers: {
        Authorization: this.token
      }
    })
      .then(res => res.data)
  }

  createWebhook = async (webhookInfo: {
    url: string
    sellerAddress: string
  }): Promise<IWebhook> => {
    return await axios.post(this.formatApiUrl('/webhook/create'), webhookInfo, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  updateWebhook = async (id: string, webhookInfo: {
    url: string
    verificationKey: string
    isOffline: boolean
    isPaused: boolean
    isDeleted: boolean
  }): Promise<void> => {
    await axios.put(
      this.formatApiUrl(`/webhook/${id}`),
      webhookInfo,
      {
        headers: {
          Authorization: this.token,
          'Content-Type': 'application/json'
        }
      })
  }

  deleteWebhook = async (id: string): Promise<void> => {
    return await axios.delete(this.formatApiUrl(`/webhook/${id}`), {
      headers: {
        Authorization: this.token
      }
    })
  }

  getWebhookFailures = async (id: string, limit: number, offset: number): Promise<IWebhookFailure[]> => {
    const params = { limit, offset }
    return await axios.get(this.formatApiUrl(`/webhook/${id}/failures`), {
      headers: {
        Authorization: this.token
      },
      params
    })
      .then(res => res.data)
  }

  archiveProduct = async (sellerAddress: string, productId: string, isArchived: boolean): Promise<IProduct> => {
    return await axios.put(this.formatApiUrl(`/product/${productId}/seller_address/${sellerAddress.toLowerCase()}/is_archived/${isArchived}`), isArchived, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  resendWebhookFailures = async (id: string): Promise<IWebhook> => {
    return await axios.post(this.formatApiUrl(`/webhook/${id}/failures/resend`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  resendWebhookFailure = async (id: string): Promise<IWebhook> => {
    return await axios.post(this.formatApiUrl(`/webhook_failure/${id}/resend`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  listPermissionRoles = async (): Promise<IPermissionRole[]> => {
    return await axios.get(this.formatApiUrl('/permission_role'), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  deletePermissionRole = async (id: string): Promise<void> => {
    return await axios.delete(this.formatApiUrl(`/permission_role/${id}`), {
      headers: {
        Authorization: this.token
      }
    })
  }

  createPermissionRole = async (permissionsRequest: { name: string, permissions: string[] }): Promise<void> => {
    return await axios.post(this.formatApiUrl('/permission_role'), permissionsRequest, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  assignRoles = async (req: { userAddress: string, roleNames: string[] }): Promise<void> => {
    return await axios.post(this.formatApiUrl('/permission_role/assign'), req, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  unassignRoles = async (req: { userAddress: string, roleNames: string[] }): Promise<void> => {
    return await axios.post(this.formatApiUrl('/permission_role/unassign'), req, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  listLogEvents = async (sellerAddress: string): Promise<ILogEvent[]> => {
    return await axios.get(this.formatApiUrl(`/log_events?sellerAddress=${sellerAddress}`))
      .then(res => res.data)
  }

  getPriceQuotes = async(from: string[], to: string[]): Promise<IPriceQuote[]> => {
    const fromCurrencies = from.map((f, i) => `from[${i}]=${f}`).join('&')
    const toCurrencies = to.map((f, i) => `to[${i}]=${f}`).join('&')
    return await axios.get(this.formatApiUrl(`/price_quotes?${fromCurrencies}&${toCurrencies}`)).then(res => res.data)
  }

  getCheckoutSession = async (id: string): Promise<ICheckoutSessionSummary> => {
    return await axios.get(
      this.formatApiUrl(`/checkout_session/${id}`),
      {
        headers: { Authorization: this.token }
      }
    )
      .then(res => res.data)
  }

  listCheckoutSessions = async (): Promise<ICheckoutSessionSummary[]> => {
    return await axios.get(
      this.formatApiUrl('/checkout_sessions'),
      {
        headers: { Authorization: this.token }
      }
    )
      .then(res => res.data)
  }

  createCheckoutSession = async (req: ICreateCheckoutSession): Promise<ICreateCheckoutSessionResult> => {
    return await axios.post(
      this.formatApiUrl('/checkout_session'),
      req,
      {
        headers: { Authorization: this.token }
      }
    )
      .then(res => res.data)
  }

  cancelCheckoutSession = async (checkoutSessionId: string): Promise<any> => {
    return await axios.delete(this.formatApiUrl(`/checkout_session/${checkoutSessionId}`), {
      headers: {
        Authorization: this.token
      }
    })
  }

  getWalletShare = async(loginType: string, token: string): Promise<WalletShare> => {
    return await axios.get(this.formatApiUrl(`/get_wallet_share?loginType=${loginType}&token=${token}`)).then(res => res.data)
  }

  storeWalletShare = async(loginType: string, token: string, walletShare: string): Promise<void> => {
    return await axios.post(this.formatApiUrl('/store_wallet_share'), {
      loginType,
      token,
      walletShare
    }).then(res => res.data)
  }

  getPaymentLinkOrder = async(sellerAddress: string, paymentLinkOrderId: string): Promise<PaymentLinkOrder> => {
    return await axios.get(this.formatApiUrl(`/payment_link_order/${sellerAddress}/order_id/${paymentLinkOrderId}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  getManagedBalance = async(): Promise<ManagedBalance[]> => {
    return await axios.get(this.formatApiUrl('/managed_balance'), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  submitWithdrawalRequest = async(
    network: string,
    amount: string,
    withdrawalAddress: string,
    token?: string
  ): Promise<void> => {
    return await axios.post(this.formatApiUrl('/withdrawal_request'), {
      network, token, amount, withdrawalAddress
    }, {
      headers: {
        Authorization: this.token
      }
    })
  }

  listWithdrawalRequest = async(): Promise<WithdrawalRequest[]> => {
    return await axios.get(this.formatApiUrl('/withdrawal_request'), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  redeemDiscountCode = async(id: string, code: string): Promise<IDiscountCode> => {
    return await axios.get(this.formatApiUrl(`/payment_link/${id}/discount/${code}`)).then(res => res.data)
  }

  createPaymentLinkOrder = async (data: NewPendingPaymentLinkOrder): Promise<IPaymentLinkOrder> => {
    return await axios.post(this.formatApiUrl('/payment_link_order/pending'), data)
      .then(res => res.data)
      .catch(err => { throw new Error(err.response.data.error) })
  }

  createCheckoutSessionOrder = async (data: NewPendingCheckoutSessionOrder): Promise<ICheckoutSessionOrder> => {
    return await axios.post(this.formatApiUrl('/checkout/pending'), data)
      .then(res => res.data)
      .catch(err => { throw new Error(err.response.data.error) })
  }

  createInvoicePayment = async (data: NewPendingInvoicePayment): Promise<IInvoicePayment> => {
    return await axios.post(this.formatApiUrl('/invoices/pending'), data).then(res => res.data)
  }

  getManagedPaymentStatus = async(paymentId: string): Promise<IManagedPaymentStatus> => {
    return await axios.get(this.formatApiUrl(`/managed_payment_status/${paymentId}`)).then(res => res.data)
  }

  createPaymentSession = async(req: NewPaymentSession): Promise<PaymentSession> => {
    return await axios.post(this.formatApiUrl('/payment_session'), req, {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }

  getPaymentSession = async(id: string): Promise<PaymentSession> => {
    return await axios.get(this.formatApiUrl(`/payment_session/${id}`), {
      headers: {
        Authorization: this.token
      }
    }).then(res => res.data)
  }
}

export default RadomAPI
