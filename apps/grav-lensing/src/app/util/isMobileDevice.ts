const isMobileDevice = (): boolean => {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth < 900) || (window.innerHeight < 650);
};

export default isMobileDevice;
