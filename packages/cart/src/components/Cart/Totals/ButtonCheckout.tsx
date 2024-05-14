import { useState, useEffect } from "react"
import { LineItemsCount } from "@commercelayer/react-components"
import useOrderContainer from "@commercelayer/react-components/hooks/useOrderContainer"
import { useTranslation } from "react-i18next"
import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { isEmbedded } from "#utils/isEmbedded"
import { getCachedCredentials } from "#utils/getAuthToken"

export const ButtonCheckout = () => {
  const { t } = useTranslation()
  const label = t("general.gotToCheckoutCta")
  const { order } = useOrderContainer()
const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getCachedCredentials()
        setToken(token)
      } catch (error) {
        console.error("Failed to fetch credentials:", error)
      }
    }
    fetchToken()
  }, [])

  return (
    <>
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
              <button className="w-full">
                <a
                  href={`https://checkout.trendhopper.de/${order?.id}?accessToken=${token}`}
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
