import { createContext, useContext, useState, useEffect } from 'react';

const TelemetryContext = createContext(null);

export const useTelemetry = () => useContext(TelemetryContext);

export function TelemetryProvider({ children }) {
  const [telemetry, setTelemetry] = useState(() => {
    if (typeof window === 'undefined') return null;

    try {
      const cachedTelemetry = sessionStorage.getItem('nexus_telemetry_cache');
      return cachedTelemetry ? JSON.parse(cachedTelemetry) : null;
    } catch {
      return null;
    }
  });
  const [hasScanned, setHasScanned] = useState(() => Boolean(telemetry));

  useEffect(() => {
    // Only run this once per session
    if (telemetry) {
      return;
    }

    let mounted = true;

    const extractTelemetry = async () => {
      // 1. Hardware & Browser
      const cores = navigator.hardwareConcurrency || 'Unknown';
      const memory = navigator.deviceMemory || 'Unknown';
      const platform = navigator.platform || 'Unknown';
      const userAgent = navigator.userAgent;
      
      let deviceType = 'Desktop';
      if (/Mobi|Android/i.test(userAgent)) deviceType = 'Mobile';
      if (/Tablet|iPad/i.test(userAgent)) deviceType = 'Tablet';

      const screenRes = `${window.screen.width}x${window.screen.height}`;
      const colorDepth = window.screen.colorDepth;
      const lang = navigator.language;

      // 2. Battery (if supported)
      let batteryInfo = 'Unknown';
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          batteryInfo = `${Math.round(battery.level * 100)}% ${battery.charging ? '(Charging)' : ''}`;
        } catch {
          // Battery API is unavailable or blocked.
        }
      }

      // 3. Performance Memory (if supported)
      let heapLimit = 'Unknown';
      if (performance && performance.memory) {
        heapLimit = `${Math.round(performance.memory.jsHeapSizeLimit / 1048576)} MB`;
      }

      // 4. Timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // 5. GPU Extraction via WebGL
      let gpu = 'Unknown / Integrated';
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          }
        }
      } catch {
        // WebGL renderer details are intentionally unavailable in some browsers.
      }

      // 6. Network Connection Info
      let connection = 'Unknown';
      let latency = 'Calculating...';
      if (navigator.connection) {
        connection = navigator.connection.effectiveType || connection;
        latency = navigator.connection.rtt ? `${navigator.connection.rtt}ms` : latency;
      }

      // 7. IP Geolocation (Public API)
      let networkData = { ip: 'Proxy/Encrypted', city: 'Unknown', country: 'Unknown', isp: 'Unknown' };
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.ip) {
          networkData = {
            ip: data.ip,
            city: data.city,
            country: data.country_name,
            isp: data.org
          };
        }
      } catch {
        // Geolocation enrichment is optional and should fail quietly.
      }

      if (!mounted) return;

      // 8. Advanced AI Insight Generation
      let insight = "Standard environmental configuration detected.";
      
      // Developer / High Performance
      if (deviceType === 'Desktop' && (cores >= 8 || memory >= 8)) {
        if (platform.toLowerCase().includes('mac') || platform.toLowerCase().includes('linux')) {
          insight = `Unix-based high-performance workstation detected in ${networkData.country || 'your region'}. Strong indicators of a developer or engineering environment.`;
        } else {
          insight = `High-compute workstation detected. System architecture suggests advanced rendering or gaming capabilities.`;
        }
      } 
      // Mobile
      else if (deviceType === 'Mobile') {
        insight = `Biometric touch-interface detected on mobile architecture. Optimizing data streams for reduced bandwidth over ${connection} network.`;
      }
      // Low latency
      else if (parseInt(latency) < 50) {
        insight = `Extremely low latency network detected (${latency}). Connection routed through ${networkData.isp || 'premium ISP'}, indicating stable infrastructure.`;
      }

      // Special Easter Egg Triggers in insight
      if (batteryInfo.includes('100%')) {
        insight += ' System power is fully saturated.';
      }
      if (gpu.toLowerCase().includes('nvidia')) {
        insight += ' Neural processing units (GPU) available for heavy computation.';
      }

      const finalTelemetry = {
        device: { cores, memory, platform, deviceType, screenRes, colorDepth, lang, battery: batteryInfo, heapLimit, timezone },
        network: { ...networkData, connection, latency },
        gpu,
        aiInsight: insight
      };

      setTelemetry(finalTelemetry);
      setHasScanned(true);
      sessionStorage.setItem('nexus_telemetry_cache', JSON.stringify(finalTelemetry));
    };

    // Small delay so it doesn't block critical page load
    setTimeout(extractTelemetry, 1000);

    return () => { mounted = false; };
  }, [telemetry]);

  return (
    <TelemetryContext.Provider value={{ telemetry, hasScanned }}>
      {children}
    </TelemetryContext.Provider>
  );
}
