var $8zHUo$axios = require("axios");

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $ddcaca14cf042a83$exports = {};

$parcel$defineInteropFlag($ddcaca14cf042a83$exports);

$parcel$export($ddcaca14cf042a83$exports, "default", () => $ddcaca14cf042a83$export$2e2bcd8739ae039);

class $ddcaca14cf042a83$var$RadomAPI {
    constructor(url = "https://api.radom.network"){
        this.url = url;
        this.token = "";
        this.formatApiUrl = (endpoint)=>`${this.url}${endpoint}`;
        this.renewToken = async ()=>{
            const authRenewResponse = await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/auth/renew"), null, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
            this.token = authRenewResponse.jwtToken;
        };
        this.requestAuth = async (address)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/auth/request"), {
                address: address
            }).then((res)=>res.data);
        };
        this.verifyAuth = async (address, signedMessage)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/auth/verify"), {
                address: address,
                signature: signedMessage
            }).then(async (res)=>res.data);
        };
        this.getProducts = async (includeArchived)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl("/products"), {
                headers: {
                    Authorization: this.token
                },
                params: {
                    include_archived: includeArchived
                }
            }).then((res)=>res.data);
        };
        this.listDiscountCodes = async ()=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl("/discount_codes"), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.getSellerProfile = async (addr)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/sellers/${addr}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.updateSellerProfile = async (profile)=>{
            await (0, ($parcel$interopDefault($8zHUo$axios))).put(this.formatApiUrl("/sellers/update"), profile, {
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json"
                }
            });
        };
        this.getProduct = async (productId)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/product/${productId}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.updateProduct = async (productId, productInfo)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).put(this.formatApiUrl(`/product/${productId}`), productInfo, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.createProduct = async (productInfo)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/product/create"), productInfo, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.createPaymentLink = async (paymentLinkReq)=>{
            const paymentLinkData = {
                ...paymentLinkReq,
                products: paymentLinkReq.products.map((p)=>p.id)
            };
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/payment_link/create"), paymentLinkData, {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.createDiscountCode = async (discountCodeReq)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/discount_code/create"), discountCodeReq, {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.deleteDiscountCode = async (discountCodeId)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).delete(this.formatApiUrl(`/discount_code/${discountCodeId}`), {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.getPaymentLink = async (paymentLinkId)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/payment_link/${paymentLinkId}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.getPaymentLinks = async ()=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl("/payment_links"), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.updatePaymentLink = async (paymentLink, sellerAddress)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).put(this.formatApiUrl(`/payment_link/update/${sellerAddress}/${paymentLink.id}`), paymentLink, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.deletePaymentLink = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).delete(this.formatApiUrl(`/payment_link/${id}`), {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.deleteProduct = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).delete(this.formatApiUrl(`/product/${id}`), {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.createCustomer = async (customerForm, sellerAddress)=>{
            const data = {
                sellerAddress: sellerAddress,
                ...customerForm
            };
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/customer"), data, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.getCustomer = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/customer/${id}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.getSellerCustomers = async (sellerAddress)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/sellers/${sellerAddress}/customers`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.createInvoice = async (data, sellerAddress)=>{
            const invoiceData = {
                ...data,
                customerIds: data.customers.map((c)=>c.id),
                sellerAddress: sellerAddress,
                products: data.products.map((p)=>{
                    return {
                        ...p,
                        quantity: Number(p.quantity),
                        product: {
                            ...p.product,
                            price: Number(p.product.price)
                        }
                    };
                }),
                lineItems: data.lineItems.map((l)=>{
                    return {
                        ...l,
                        quantity: Number(l.quantity),
                        price: Number(l.price)
                    };
                })
            };
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/invoice"), invoiceData, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.getInvoice = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/invoice/${id}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>{
                return res.data;
            });
        };
        this.getInvoicePayment = async (invoiceId)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/invoice/payment/${invoiceId}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>{
                return res.data;
            });
        };
        this.getSellerInvoices = async (sellerAddress)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/sellers/${sellerAddress}/invoices`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.voidInvoice = async (invoiceId)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).delete(this.formatApiUrl(`/invoice/${invoiceId}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.updateLastBlockAck = async (data)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).put(this.formatApiUrl("/notifications"), data, {
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json"
                }
            });
        };
        this.getLastBlockAck = async (data)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/notifications?userAddress=${data.userAddress}&orgAddress=${data.orgAddress}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.generateAPIToken = async (name)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/api_token"), {
                name: name
            }, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.deleteAPIToken = async (sessionId)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).delete(this.formatApiUrl(`/api_token/${sessionId}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.listAPITokens = async ()=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl("/api_tokens"), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.getWebhooks = async (addr)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/sellers/${addr}/webhooks`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.getWebhook = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/webhook/${id}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.createWebhook = async (webhookInfo)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/webhook/create"), webhookInfo, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.updateWebhook = async (id, webhookInfo)=>{
            await (0, ($parcel$interopDefault($8zHUo$axios))).put(this.formatApiUrl(`/webhook/${id}`), webhookInfo, {
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json"
                }
            });
        };
        this.deleteWebhook = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).delete(this.formatApiUrl(`/webhook/${id}`), {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.getWebhookFailures = async (id, limit, offset)=>{
            const params = {
                limit: limit,
                offset: offset
            };
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/webhook/${id}/failures`), {
                headers: {
                    Authorization: this.token
                },
                params: params
            }).then((res)=>res.data);
        };
        this.archiveProduct = async (sellerAddress, productId, isArchived)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).put(this.formatApiUrl(`/product/${productId}/seller_address/${sellerAddress.toLowerCase()}/is_archived/${isArchived}`), isArchived, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.resendWebhookFailures = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl(`/webhook/${id}/failures/resend`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.resendWebhookFailure = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl(`/webhook_failure/${id}/resend`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.listPermissionRoles = async ()=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl("/permission_role"), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.deletePermissionRole = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).delete(this.formatApiUrl(`/permission_role/${id}`), {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.createPermissionRole = async (permissionsRequest)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/permission_role"), permissionsRequest, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.assignRoles = async (req)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/permission_role/assign"), req, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.unassignRoles = async (req)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/permission_role/unassign"), req, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.listLogEvents = async (sellerAddress)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/log_events?sellerAddress=${sellerAddress}`)).then((res)=>res.data);
        };
        this.getPriceQuotes = async (from, to)=>{
            const fromCurrencies = from.map((f, i)=>`from[${i}]=${f}`).join("&");
            const toCurrencies = to.map((f, i)=>`to[${i}]=${f}`).join("&");
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/price_quotes?${fromCurrencies}&${toCurrencies}`)).then((res)=>res.data);
        };
        this.getCheckoutSession = async (id)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/checkout_session/${id}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.listCheckoutSessions = async ()=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl("/checkout_sessions"), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.createCheckoutSession = async (req)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/checkout_session"), req, {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.cancelCheckoutSession = async (checkoutSessionId)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).delete(this.formatApiUrl(`/checkout_session/${checkoutSessionId}`), {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.getWalletShare = async (loginType, token)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/get_wallet_share?loginType=${loginType}&token=${token}`)).then((res)=>res.data);
        };
        this.storeWalletShare = async (loginType, token, walletShare)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/store_wallet_share"), {
                loginType: loginType,
                token: token,
                walletShare: walletShare
            }).then((res)=>res.data);
        };
        this.getPaymentLinkOrder = async (sellerAddress, paymentLinkOrderId)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl(`/payment_link_order/${sellerAddress}/order_id/${paymentLinkOrderId}`), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.getManagedBalance = async ()=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl("/managed_balance"), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
        this.submitWithdrawalRequest = async (network, amount, withdrawalAddress, token)=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).post(this.formatApiUrl("/withdrawal_request"), {
                network: network,
                token: token,
                amount: amount,
                withdrawalAddress: withdrawalAddress
            }, {
                headers: {
                    Authorization: this.token
                }
            });
        };
        this.listWithdrawalRequest = async ()=>{
            return await (0, ($parcel$interopDefault($8zHUo$axios))).get(this.formatApiUrl("/withdrawal_request"), {
                headers: {
                    Authorization: this.token
                }
            }).then((res)=>res.data);
        };
    }
}
var $ddcaca14cf042a83$export$2e2bcd8739ae039 = $ddcaca14cf042a83$var$RadomAPI;


$parcel$exportWildcard(module.exports, $ddcaca14cf042a83$exports);


//# sourceMappingURL=main.js.map
