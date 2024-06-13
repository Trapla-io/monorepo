const SECTIONS_TEMPLATES = [
  {
    tag: "cover",
    icon: 'description',
    label: "Page de garde",
    title: "Page de garde",
    cover_image: null,
    items: {
      title: "",
      showSummary: true,
    }
  },
  {
    tag: "useful-informations",
    icon: 'info',
    label: "Infos utiles",
    title: "Infos utiles",
    cover_image: null,
    items: {
      informations: [],
    }
  },
  {
    tag: "check-list",
    icon: 'check',
    label: "Check-list",
    title: "Check-list",
    cover_image: null,
    items: {
      check_list: [],
    }
  },
  {
    tag: "itinerary",
    icon: 'map',
    label: "Itinéraire",
    title: "Itinéraire",
    cover_image: null,
    items: {
      steps: [],
    }
  },
  {
    tag: "accommodations",
    icon: 'hotel',
    label: "Hébergements",
    title: "Hébergements",
    cover_image: null,
    items: {
      accommodations: [],
    }
  },
  {
    tag: "map",
    icon: 'location_on',
    label: "Carte",
    title: "Carte",
    cover_image: null,
    items: {
      description: "",
      link: "",
      image: null,
    }
  },
  {
    tag: "transports",
    icon: "flight",
    label: "Transports",
    title: "Transports",
    cover_image: null,
    items: {
      routes: [],
    }
  },
  {
    tag: "contact",
    icon: "contact_phone",
    label: "Page de contact",
    title: "Bon voyage !",
    cover_image: null,
    items: {
      email: "",
      phone: "",
      image: null,
      website: "",
    }
  }
]

export {
  SECTIONS_TEMPLATES,
}