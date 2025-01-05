export default defineNuxtRouteMiddleware((to, from) => {
  // جلب التوكن من localStorage
  onNuxtReady(() => {
    const token = localStorage.getItem("token");
    const restrictedPaths = ["/sections/", "/dashboard/"];

    // التحقق إذا كان المسار الحالي يبدأ بأي من المسارات المحظورة
    const isRestricted = restrictedPaths.some((path) =>
      to.path.startsWith(path)
    );

    if (isRestricted && !token) {
      // إعادة التوجيه إذا لم يكن هناك توكن
      return navigateTo("/login"); // أو المسار المناسب لصفحة تسجيل الدخول
    }
  });

  // تحديد المسارات المحظورة
});
