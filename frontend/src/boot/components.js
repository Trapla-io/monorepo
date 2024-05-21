import BDatePicker from "../components/base/BDatePicker.vue";
import BModal from "../components/base/BModal.vue";
import BButton from "../components/base/BButton.vue";
import BInput from "../components/base/BInput.vue";
import BTable from "../components/base/BTable.vue";
import BImagePicker from "../components/base/BImagePicker.vue";
import BSearchBar from "../components/base/BSearchBar.vue";

export default ({ app }) => {
  app.component("BDatePicker", BDatePicker);
  app.component("BModal", BModal);
  app.component("BButton", BButton);
  app.component("BInput", BInput);
  app.component("BTable", BTable);
  app.component("BImagePicker", BImagePicker);
  app.component("BSearchBar", BSearchBar);
};
