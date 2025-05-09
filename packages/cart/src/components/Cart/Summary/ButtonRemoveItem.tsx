import { LineItemRemoveLink } from "@commercelayer/react-components"
import { FC, MouseEvent } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  lineItem: {
    sku_code?: string | null
    name?: string | null
    quantity?: number
    unit_amount_float?: number | null
    item_type?: string | null
    item?: {
      name?: string | null
    }
  }
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export const ButtonRemoveItem: FC<Props> = ({ lineItem }) => {
  const { t } = useTranslation()
  const title = t("general.remove")

  const handleRemoveFromCart = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "remove_from_cart",
        ecommerce: {
          currency: "EUR",
          value: (lineItem.unit_amount_float ?? 0) * (lineItem.quantity ?? 1),
          items: [
            {
              item_id: lineItem.sku_code ?? "unknown",
              item_name:
                lineItem.name ?? lineItem.item?.name ?? "Unnamed product",
              price: lineItem.unit_amount_float ?? 0,
              quantity: lineItem.quantity ?? 1,
              item_category: lineItem.item_type ?? "product",
            },
          ],
        },
      })
    }
  }

  return (
    <LineItemRemoveLink>
      {({ handleRemove }) => (
        <a
          onClick={(event: MouseEvent<HTMLAnchorElement>) => {
            handleRemoveFromCart()
            handleRemove(event)
          }}
          className="cursor-pointer hover:text-red-500"
          title={title}
          data-test-id="button-remove-item"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 7H5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 13V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 13V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </LineItemRemoveLink>
  )
}
