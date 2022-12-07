# radom-js
This package contains the Javascript Radom SDK. It can be used to create both self-custodial and managed checkouts. For more details, checkout the docs at https://docs.radom.network.


# Basic examples

## How to create a managed checkout session

```typescript
import radom from '@radom/radom-js'

const radomAPI = new radom.RadomAPI({
  token: 'YOUR_API_TOKEN'
})

const res = await radomAPI.createCheckoutSession({
  gateway: {
    managed: {
      methods: [
        // ETH
        { network: 'Ethereum' },
        // USDC on Ethereum
        { network: 'Ethereum', token: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
        // SOL
        { network: 'Solana' },
        // LTC
        { network: 'Litecoin' }
      ]
    }
  },
  total: 30,
  currency: 'USD',
  successUrl: 'https://ethereum.org',
  customizations: {
    leftPanelColor: 'red',
    primaryButtonColor: 'black',
    slantedEdge: true,
    allowDiscountCodes: true,
  }
})
```


## How to create a payment session

```typescript
import radom from '@radom/radom-js'

const radomAPI = new radom.RadomAPI({
  token: 'YOUR_API_TOKEN'
})

const res = await radomAPI.createPaymentSession({
  method: {
    network: 'Bitcoin'
  },
  total: 0.5,
  currency: 'USD'
})
```
