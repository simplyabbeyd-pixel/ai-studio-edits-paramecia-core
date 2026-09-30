const FELIX = {
  version: '0.1.0',
  principle: 'Nothing flourishes alone.',
};

function getFelixConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    felixZoneId: props.getProperty('FELIX_ZONE_ID') || '',
    buildLabId: props.getProperty('BUILD_LAB_ID') || '',
    colabRuntimeId: props.getProperty('COLAB_RUNTIME_ID') || '',
    appsScriptAutomationId: props.getProperty('APPS_SCRIPT_AUTOMATION_ID') || '',
  };
}

function validateFolder_(id) {
  if (!id) return { configured: false, accessible: false, name: null };
  try {
    const folder = DriveApp.getFolderById(id);
    return { configured: true, accessible: true, name: folder.getName() };
  } catch (err) {
    return { configured: true, accessible: false, name: null, error: String(err) };
  }
}

function healthcheck() {
  const config = getFelixConfig_();
  return {
    ok: true,
    name: 'Felix.Null',
    version: FELIX.version,
    principle: FELIX.principle,
    timestamp: new Date().toISOString(),
    folders: {
      felixZone: validateFolder_(config.felixZoneId),
      buildLab: validateFolder_(config.buildLabId),
      colabRuntime: validateFolder_(config.colabRuntimeId),
      appsScriptAutomation: validateFolder_(config.appsScriptAutomationId),
    },
  };
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify(healthcheck(), null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}
