import $hgUW1$axios from "axios";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

class $52e11f599a4f5dca$var$RadomAPI {
    token = "";
    constructor(apiOptions){
        this.url = apiOptions?.url || "https://api.radom.network";
        if (apiOptions?.token) this.token = apiOptions?.token;
    }
    formatApiUrl = (endpoint)=>`${this.url}${endpoint}`;
    renewToken = async ()=>{
        const authRenewResponse = await (0, $hgUW1$axios).post(this.formatApiUrl("/auth/renew"), null, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
        this.token = authRenewResponse.jwtToken;
    };
    requestAuth = async (address)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/auth/request"), {
            address: address
        }).then((res)=>res.data);
    };
    verifyAuth = async (address, signedMessage)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/auth/verify"), {
            address: address,
            signature: signedMessage
        }).then(async (res)=>res.data);
    };
    getProducts = async (includeArchived)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl("/products"), {
            headers: {
                Authorization: this.token
            },
            params: {
                include_archived: includeArchived
            }
        }).then((res)=>res.data);
    };
    listDiscountCodes = async ()=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl("/discount_codes"), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getSellerProfile = async (addr)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/sellers/${addr}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    updateSellerProfile = async (profile)=>{
        await (0, $hgUW1$axios).put(this.formatApiUrl("/sellers/update"), profile, {
            headers: {
                Authorization: this.token,
                "Content-Type": "application/json"
            }
        });
    };
    getProduct = async (productId)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/product/${productId}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    updateProduct = async (productId, productInfo)=>{
        return await (0, $hgUW1$axios).put(this.formatApiUrl(`/product/${productId}`), productInfo, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    createProduct = async (productInfo)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/product/create"), productInfo, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    createPaymentLink = async (paymentLinkReq)=>{
        const paymentLinkData = {
            ...paymentLinkReq,
            products: paymentLinkReq.products.map((p)=>p.id)
        };
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/payment_link/create"), paymentLinkData, {
            headers: {
                Authorization: this.token
            }
        });
    };
    createDiscountCode = async (discountCodeReq)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/discount_code/create"), discountCodeReq, {
            headers: {
                Authorization: this.token
            }
        });
    };
    deleteDiscountCode = async (discountCodeId)=>{
        return await (0, $hgUW1$axios).delete(this.formatApiUrl(`/discount_code/${discountCodeId}`), {
            headers: {
                Authorization: this.token
            }
        });
    };
    getPaymentLink = async (paymentLinkId)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/payment_link/${paymentLinkId}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getPaymentLinks = async ()=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl("/payment_links"), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    updatePaymentLink = async (paymentLink, sellerAddress)=>{
        return await (0, $hgUW1$axios).put(this.formatApiUrl(`/payment_link/update/${sellerAddress}/${paymentLink.id}`), paymentLink, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    deletePaymentLink = async (id)=>{
        return await (0, $hgUW1$axios).delete(this.formatApiUrl(`/payment_link/${id}`), {
            headers: {
                Authorization: this.token
            }
        });
    };
    deleteProduct = async (id)=>{
        return await (0, $hgUW1$axios).delete(this.formatApiUrl(`/product/${id}`), {
            headers: {
                Authorization: this.token
            }
        });
    };
    createCustomer = async (customerForm, sellerAddress)=>{
        const data = {
            sellerAddress: sellerAddress,
            ...customerForm
        };
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/customer"), data, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getCustomer = async (id)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/customer/${id}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getSellerCustomers = async (sellerAddress)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/sellers/${sellerAddress}/customers`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    createInvoice = async (data, sellerAddress)=>{
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
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/invoice"), invoiceData, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getInvoice = async (id)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/invoice/${id}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>{
            return res.data;
        });
    };
    getInvoicePayment = async (invoiceId)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/invoice/payment/${invoiceId}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>{
            return res.data;
        });
    };
    getSellerInvoices = async (sellerAddress)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/sellers/${sellerAddress}/invoices`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    voidInvoice = async (invoiceId)=>{
        return await (0, $hgUW1$axios).delete(this.formatApiUrl(`/invoice/${invoiceId}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    updateLastBlockAck = async (data)=>{
        return await (0, $hgUW1$axios).put(this.formatApiUrl("/notifications"), data, {
            headers: {
                Authorization: this.token,
                "Content-Type": "application/json"
            }
        });
    };
    getLastBlockAck = async (data)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/notifications?userAddress=${data.userAddress}&orgAddress=${data.orgAddress}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    generateAPIToken = async (name)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/api_token"), {
            name: name
        }, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    deleteAPIToken = async (sessionId)=>{
        return await (0, $hgUW1$axios).delete(this.formatApiUrl(`/api_token/${sessionId}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    listAPITokens = async ()=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl("/api_tokens"), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getWebhooks = async (addr)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/sellers/${addr}/webhooks`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getWebhook = async (id)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/webhook/${id}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    createWebhook = async (webhookInfo)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/webhook/create"), webhookInfo, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    updateWebhook = async (id, webhookInfo)=>{
        await (0, $hgUW1$axios).put(this.formatApiUrl(`/webhook/${id}`), webhookInfo, {
            headers: {
                Authorization: this.token,
                "Content-Type": "application/json"
            }
        });
    };
    deleteWebhook = async (id)=>{
        return await (0, $hgUW1$axios).delete(this.formatApiUrl(`/webhook/${id}`), {
            headers: {
                Authorization: this.token
            }
        });
    };
    getWebhookFailures = async (id, limit, offset)=>{
        const params = {
            limit: limit,
            offset: offset
        };
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/webhook/${id}/failures`), {
            headers: {
                Authorization: this.token
            },
            params: params
        }).then((res)=>res.data);
    };
    archiveProduct = async (sellerAddress, productId, isArchived)=>{
        return await (0, $hgUW1$axios).put(this.formatApiUrl(`/product/${productId}/seller_address/${sellerAddress.toLowerCase()}/is_archived/${isArchived}`), isArchived, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    resendWebhookFailures = async (id)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl(`/webhook/${id}/failures/resend`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    resendWebhookFailure = async (id)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl(`/webhook_failure/${id}/resend`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    listPermissionRoles = async ()=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl("/permission_role"), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    deletePermissionRole = async (id)=>{
        return await (0, $hgUW1$axios).delete(this.formatApiUrl(`/permission_role/${id}`), {
            headers: {
                Authorization: this.token
            }
        });
    };
    createPermissionRole = async (permissionsRequest)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/permission_role"), permissionsRequest, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    assignRoles = async (req)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/permission_role/assign"), req, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    unassignRoles = async (req)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/permission_role/unassign"), req, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    listLogEvents = async (sellerAddress)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/log_events?sellerAddress=${sellerAddress}`)).then((res)=>res.data);
    };
    getPriceQuotes = async (from, to)=>{
        const fromCurrencies = from.map((f, i)=>`from[${i}]=${f}`).join("&");
        const toCurrencies = to.map((f, i)=>`to[${i}]=${f}`).join("&");
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/price_quotes?${fromCurrencies}&${toCurrencies}`)).then((res)=>res.data);
    };
    getCheckoutSession = async (id)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/checkout_session/${id}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    listCheckoutSessions = async ()=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl("/checkout_sessions"), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    createCheckoutSession = async (req)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/checkout_session"), req, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    cancelCheckoutSession = async (checkoutSessionId)=>{
        return await (0, $hgUW1$axios).delete(this.formatApiUrl(`/checkout_session/${checkoutSessionId}`), {
            headers: {
                Authorization: this.token
            }
        });
    };
    getWalletShare = async (loginType, token)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/get_wallet_share?loginType=${loginType}&token=${token}`)).then((res)=>res.data);
    };
    storeWalletShare = async (loginType, token, walletShare)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/store_wallet_share"), {
            loginType: loginType,
            token: token,
            walletShare: walletShare
        }).then((res)=>res.data);
    };
    getPaymentLinkOrder = async (sellerAddress, paymentLinkOrderId)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/payment_link_order/${sellerAddress}/order_id/${paymentLinkOrderId}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getManagedBalance = async ()=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl("/managed_balance"), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    submitWithdrawalRequest = async (network, amount, withdrawalAddress, token)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/withdrawal_request"), {
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
    listWithdrawalRequest = async ()=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl("/withdrawal_request"), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    redeemDiscountCode = async (id, code)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/payment_link/${id}/discount/${code}`)).then((res)=>res.data);
    };
    createPaymentLinkOrder = async (data)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/payment_link_order/pending"), data).then((res)=>res.data).catch((err)=>{
            throw new Error(err.response.data.error);
        });
    };
    createCheckoutSessionOrder = async (data)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/checkout/pending"), data).then((res)=>res.data).catch((err)=>{
            throw new Error(err.response.data.error);
        });
    };
    createInvoicePayment = async (data)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/invoices/pending"), data).then((res)=>res.data);
    };
    getManagedPaymentStatus = async (paymentId)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/managed_payment_status/${paymentId}`)).then((res)=>res.data);
    };
    createPaymentSession = async (req)=>{
        return await (0, $hgUW1$axios).post(this.formatApiUrl("/payment_session"), req, {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
    getPaymentSession = async (id)=>{
        return await (0, $hgUW1$axios).get(this.formatApiUrl(`/payment_session/${id}`), {
            headers: {
                Authorization: this.token
            }
        }).then((res)=>res.data);
    };
}
var $52e11f599a4f5dca$export$2e2bcd8739ae039 = $52e11f599a4f5dca$var$RadomAPI;


var $b9fbf0da9ae592a3$exports = {};

$parcel$export($b9fbf0da9ae592a3$exports, "InputFieldDataType", () => $b9fbf0da9ae592a3$export$8d291ecd86a6c444);
let $b9fbf0da9ae592a3$export$8d291ecd86a6c444;
(function(InputFieldDataType) {
    InputFieldDataType["String"] = "Text";
    InputFieldDataType["Number"] = "Number";
    InputFieldDataType["Email"] = "Email address";
})($b9fbf0da9ae592a3$export$8d291ecd86a6c444 || ($b9fbf0da9ae592a3$export$8d291ecd86a6c444 = {}));


var $149c1bd638913645$export$2e2bcd8739ae039 = {
    RadomAPI: $52e11f599a4f5dca$export$2e2bcd8739ae039
};


export {$149c1bd638913645$export$2e2bcd8739ae039 as default, $b9fbf0da9ae592a3$export$8d291ecd86a6c444 as InputFieldDataType};
//# sourceMappingURL=module.js.map
