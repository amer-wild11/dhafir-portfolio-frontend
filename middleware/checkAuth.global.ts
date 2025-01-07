export default defineNuxtRouteMiddleware((to) => {
  onNuxtReady(() => {
    const token = localStorage.getItem("token");

    // تحديد المسارات المسموح الوصول إليها
    const allowedPaths = ["/", "/work"];

    // التحقق إذا كان المسار الحالي غير مسموح به
    const isRestricted = !allowedPaths.includes(to.path);

    if (isRestricted && !token) {
      // إعادة التوجيه إذا لم يكن هناك توكن
      return navigateTo("/login");
    }
  });
});
