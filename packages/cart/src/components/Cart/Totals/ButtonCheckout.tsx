import {
  LineItemsCount,
  PaymentMethod,
  PaymentMethodsContainer,
  PaymentSource,
} from "@commercelayer/react-components"
import useOrderContainer from "@commercelayer/react-components/hooks/useOrderContainer"
import { useTranslation } from "react-i18next"

import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { isEmbedded } from "#utils/isEmbedded"

export const ButtonCheckout = () => {
  const { t } = useTranslation()
  const label = t("general.gotToCheckoutCta")
  const { order } = useOrderContainer()

  const accessToken = new URL(window.location.href).searchParams.get(
    "accessToken"
  )

  return (
    <>
      <div key={order?.total_amount_cents}>
        <PaymentMethodsContainer>
          <PaymentMethod expressPayments className="mb-4" loader={<div />}>
            <PaymentSource loader={<div />} />
          </PaymentMethod>
        </PaymentMethodsContainer>
      </div>
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <button className="w-full">
              <a
                href={`${import.meta.env.PUBLIC_CHECKOUT_URL}/${
                  order?.id
                }?accessToken=${accessToken}`}
                target={isEmbedded() ? "_top" : undefined}
                className={
                  "button-base bg-primary text-contrast block rounded-md py-3 px-3"
                }
                data-test-id="button-checkout"
                aria-disabled="false"
              >
                {label}
              </a>
            </button>
          ) : (
            <ButtonCheckoutDisabled />
          )
        }
      </LineItemsCount>
    </>
  )
}
