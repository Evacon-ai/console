@@ .. @@
 const router = useRouter()
 const route = useRoute()
 const organizationsStore = useOrganizationsStore()
+
+onMounted(() => {
+  if (selectedOrganization.value?.id) {
+    organizationsStore.fetchOrganizationById(selectedOrganization.value.id)
+  }
+})