import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
import { SECTIONS_TEMPLATES } from "src/helpers/travelBookSections";

export const useTravelBooksStore = defineStore('travelBooks', {
  state: () => ({
    travelBooks: [],
    currentTravelBook: undefined,
  }),
  getters: {

  },
  actions: {
    setCurrentTravelBook(travelBookId) {
      this.currentTravelBook = {
        ...this.travelBooks.find(travelBook => travelBook.id === +travelBookId)
      }
    },
    getCurrentTravelBookSection(sectionId) {
      return this.currentTravelBook.sections.find((section) => section.id === sectionId);
    },
    async addCurrentTravelBookSection(sectionTag) {
      const response = await api.post(`/travel-books/${this.currentTravelBook.id}/sections`, {
        tag: sectionTag,
      });

      this.currentTravelBook.sections.push(response.data);
    },
    async updateCurrentTravelBookSection(updatedSection) {
      this.currentTravelBook = {
        ...this.currentTravelBook,
        sections: this.currentTravelBook.sections.map((section) => {
          if (section.id === updatedSection.id) {
            return updatedSection;
          }
          return section;
        }),
      };
    },
    async removeCurrentTravelBookSection(sectionId) {
      await api.delete(`/travel-books/${this.currentTravelBook.id}/sections/${sectionId}`);

      this.currentTravelBook.sections = this.currentTravelBook.sections.filter((section) => section.id !== sectionId);
    },
    async getAll() {
      try {
        const response = await api.get('/travel-books');

        this.travelBooks = response.data;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erreur lors de la récupération des carnets de voyage',
        });
      }
    },
    async updateOne(data) {
      try {
        const response = await api.patch(`/travel-books/${data.id}`, data);

        this.getAll();
        Notify.create({
          type: 'positive',
          message: 'Carnet de voyage sauvegardé avec succès',
        });
        return response.data;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erreur lors de la sauvegarde du carnet de voyage',
        });
      }
    },
    async create(sectionsNames, title) {
      try {
        const response = await api.post('/travel-books', {
          title,
          sections: sectionsNames.map((sectionName) => {
            const sectionTemplate = SECTIONS_TEMPLATES.find((sectionTemplate) => sectionTemplate.tag === sectionName);
            return {
              ...sectionTemplate,
            };
          }),
        });
        const newTravelBook = response.data;
        this.travelBooks.push(newTravelBook);
        this.currentTravelBook = {...newTravelBook};

        return newTravelBook;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erreur lors de la création du carnet de voyage',
        });
      }
    }
  },
});
