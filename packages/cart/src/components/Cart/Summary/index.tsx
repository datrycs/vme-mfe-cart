import {
  LineItemImage,
  LineItemName,
  LineItemAmount,
  LineItem,
  TLineItem,
  LineItemsEmpty,
  useOrderContainer,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import { LineItemFrequency } from "./LineItemFrequency"
import { LineItemOptions } from "./LineItemOptions"
import { QuantitySelector } from "./QuantitySelector"

import { EmptyCartMessage } from "#components/atoms/EmptyCartMessage"
import { useSettings } from "#components/SettingsProvider"
import { LineItemsSkeleton } from "#components/Skeleton/LineItems"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  listTypes: TLineItem[]
}

export const Summary: FC<Props> = ({ listTypes }) => {
  const { t } = useTranslation()
  const { settings } = useSettings()
  const { order } = useOrderContainer()

  const convertHoursToDays = (hours: number) => {
    return Math.ceil(hours / 24)
  }

  const lineItems = order?.line_items || []

  return (
    <>
      {listTypes.map((type) =>
        lineItems
          .filter((item) => item.item_type === type)
          .map((item) => (
            <LineItem key={item.id} type={type}>
              <div
                className="flex gap-5 pb-8 mb-8 border-b border-b-gray-300"
                data-test-id={`line-item-${type}`}
              >
                <LineItemImage
                  width={170}
                  className="w-1/4 self-start md:self-center max-h-32 object-contain"
                />

                <div className="flex-1 flex flex-col min-h-[150px]">
                  <div className="flex justify-between items-center gap-1">
                    <LineItemName className="font-bold" />
                    <ButtonRemoveItem lineItem={item as any} />
                  </div>

                  <LineItemOptions />

                  <div className="pt-2">
                    <div className="flex gap-1 text-sm">
                      <div className="text-gray-400 font-semibold">
                        {t("general.price")}:
                      </div>
                      <LineItemAmount type="unit" />
                    </div>

                    {item.metadata?.deliveryLeadTime && (
                      <div className="flex gap-1 text-sm mt-1">
                        <div className="text-gray-400 font-semibold">
                          {t("item.availability")}:
                        </div>
                        <div>
                          {(() => {
                            const deliveryLeadTime = JSON.parse(
                              item.metadata.deliveryLeadTime
                            )
                            const minDays = convertHoursToDays(
                              deliveryLeadTime.minHours
                            )
                            const maxDays = convertHoursToDays(
                              deliveryLeadTime.maxHours
                            )
                            return `${minDays}-${maxDays} ${t("item.days")}`
                          })()}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    {type === "gift_cards" ? <div /> : <QuantitySelector />}
                    <LineItemAmount className="text-lg font-semibold" />
                  </div>

                  <div className="flex justify-end">
                    <LineItemFrequency />
                  </div>
                </div>
              </div>
            </LineItem>
          ))
      )}

      <LineItemsEmpty>
        {({ quantity }) => {
          if (quantity === undefined || order === undefined) {
            return <LineItemsSkeleton />
          }

          if (quantity === 0) {
            return <EmptyCartMessage />
          }

          return <div />
        }}
      </LineItemsEmpty>

      {settings.isValid && settings.returnUrl ? (
        <div className="pt-2 pb-8">
          <a
            data-test-id="return-url"
            href={settings.returnUrl}
            className="link-base text-xs font-bold"
            target={isEmbedded() ? "_top" : undefined}
          >
            &lt; {t("general.returnUrlLabel")}
          </a>
        </div>
      ) : null}
    </>
  )
}
