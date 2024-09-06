import AccommodationForm from "src/components/forms/AccommodationForm.vue"
import CheckListItemForm from "src/components/forms/CheckListItemForm.vue"
import InformationForm from "src/components/forms/InformationForm.vue"
import RouteForm from "src/components/forms/RouteForm.vue"
import StepForm from "src/components/forms/StepForm.vue"

const DATABASE_MODULES_INFORMATION = [
  {
    name: 'accommodation',
    label: 'Hébergement',
    formComponent: AccommodationForm,
  },
  {
    name: 'check-list-items',
    label: 'Check-list',
    formComponent: CheckListItemForm,
  },
  {
    name: 'information',
    label: 'Information utile',
    formComponent: InformationForm,
  },
  {
    name: 'route',
    label: 'Transport',
    formComponent: RouteForm,
  },
  {
    name: 'itinerary-step',
    label: 'Itinéraire',
    formComponent: StepForm,
  },
]

export {
  DATABASE_MODULES_INFORMATION,
}