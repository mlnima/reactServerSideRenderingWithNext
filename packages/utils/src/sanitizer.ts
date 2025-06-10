interface SanitizeResult {
  isValid: boolean;
  sanitized: string;
  reason?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

type UsageType = 'search' | 'comment' | 'message' | 'title' | 'description' | 'username' | 'email' | 'url' | 'filename' | 'tag';

const universalSanitizer = (data: string, usageType: UsageType): SanitizeResult => {
  if (!data || typeof data !== 'string') {
    return { isValid: false, sanitized: '', reason: 'Invalid input', severity: 'medium' };
  }

  let sanitized: string;

  try {
    sanitized = data.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    sanitized = decodeURIComponent(sanitized).trim();
  } catch {
    try {
      sanitized = data.trim();
    } catch {
      return { isValid: false, sanitized: '', reason: 'Malformed input', severity: 'critical' };
    }
  }

  const config = getConfigForType(usageType);

  if (sanitized.length < config.minLength) {
    return { isValid: false, sanitized: '', reason: 'Too short', severity: 'low' };
  }

  if (sanitized.length > config.maxLength) {
    return { isValid: false, sanitized: '', reason: 'Too long', severity: 'medium' };
  }

  const criticalPatterns = [
    /\$where/i, /\$ne\s*[:=]/i, /\$gt\s*[:=]/i, /\$gte\s*[:=]/i, /\$lt\s*[:=]/i, /\$lte\s*[:=]/i,
    /\$in\s*[:=]/i, /\$nin\s*[:=]/i, /\$or\s*[:=]/i, /\$and\s*[:=]/i, /\$not\s*[:=]/i, /\$nor\s*[:=]/i,
    /\$exists\s*[:=]/i, /\$type\s*[:=]/i, /\$mod\s*[:=]/i, /\$regex\s*[:=]/i, /\$options\s*[:=]/i,
    /\$elemMatch\s*[:=]/i, /\$size\s*[:=]/i, /\$all\s*[:=]/i, /\$slice\s*[:=]/i,
    /\$match\s*[:=]/i, /\$group\s*[:=]/i, /\$project\s*[:=]/i, /\$lookup\s*[:=]/i,
    /;\s*(drop|delete|update|insert|alter|create|truncate|replace)\s+/i,
    /\bunion\s+(all\s+)?select\b/i, /\b(and|or)\s+[\d'"]+\s*[=!<>]+\s*[\d'"]+/i,
    /sleep\s*\(\s*\d+/i, /waitfor\s+delay/i, /pg_sleep\s*\(/i, /benchmark\s*\(/i,
    /information_schema/i, /mysql\./i, /sys\./i, /pg_catalog/i,
    /xp_cmdshell/i, /sp_executesql/i, /exec\s*\(/i,
    /-{2,}/, /\/\*[\s\S]*?\*\//, /#.*$/m,
    /this\./i, /function\s*\(/i, /=>\s*[{(]/i, /eval\s*\(/i,
    /setTimeout\s*\(/i, /setInterval\s*\(/i, /new\s+Function/i,
    /[;&|`]\s*[a-z]/i, /\|\||\&\&/,
    /(nslookup|curl|wget|ping|nc|netcat|telnet)/i,
    /response\.write/i, /document\.write/i, /window\./i, /alert\s*\(/i,
    /\b(cat|ls|dir|rm|del|copy|move|chmod|ps|kill|whoami|id|pwd)\b/i
  ];

  const xssPatterns = [
    /<script[\s\S]*?>/i, /<\/script>/i, /<iframe[\s\S]*?>/i, /<object[\s\S]*?>/i,
    /<embed[\s\S]*?>/i, /<applet[\s\S]*?>/i, /<meta[\s\S]*?>/i, /<link[\s\S]*?>/i,
    /<form[\s\S]*?>/i, /<input[\s\S]*?>/i, /<textarea[\s\S]*?>/i, /<button[\s\S]*?>/i,
    /<img[\s\S]*?>/i, /<svg[\s\S]*?>/i, /<audio[\s\S]*?>/i, /<video[\s\S]*?>/i,
    /<body[\s\S]*?>/i, /<html[\s\S]*?>/i, /<head[\s\S]*?>/i, /<div[\s\S]*?>/i,
    /<span[\s\S]*?>/i, /<isindex[\s\S]*?>/i, /<base[\s\S]*?>/i,
    /on\w+\s*=/i, /javascript\s*:/i, /vbscript\s*:/i, /data\s*:\s*text\/html/i,
    /expression\s*\(/i, /@import/i, /\burl\s*\(/i, /\bsrc\s*=/i,
    /onerror\s*=/i, /onload\s*=/i, /onfocus\s*=/i, /onclick\s*=/i, /onmouseover\s*=/i,
    /autofocus/i, /autoplay/i, /contenteditable/i, /formaction/i,
    /href\s*=\s*["']?\s*javascript/i, /style\s*=.*expression/i
  ];

  const pathTraversalPatterns = [
    /\.\.[\/\\]/g, /[\/\\]\.\.[\/\\]/g, /\.(php|asp|jsp|py|rb|pl|cgi|exe|bat|sh)\b/i,
    /\/etc\/passwd/i, /\/proc\/self\/environ/i, /\.htaccess/i, /web\.config/i,
    /\bfile\s*:\s*\/\//i, /\\\\/i, /\.\.\\/g, /\.\.\\.*\\/g
  ];

  const characterPatterns = [
    /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/,
    /[\uFEFF\uFFFE\uFFFF]/,
    /[\u2028\u2029]/,
    /[﹤﹥]/,
    /[＜＞]/,
    /[｛｝]/,
  ];

  for (const pattern of criticalPatterns) {
    if (pattern.test(sanitized)) {
      //console.error(`[SECURITY] Critical: ${sanitized.substring(0, 30)}...`);
      return { isValid: false, sanitized: '', reason: 'Critical pattern', severity: 'critical' };
    }
  }

  for (const pattern of xssPatterns) {
    if (pattern.test(sanitized)) {
      //console.error(`[SECURITY] XSS: ${sanitized.substring(0, 30)}...`);
      return { isValid: false, sanitized: '', reason: 'XSS pattern', severity: 'critical' };
    }
  }

  for (const pattern of pathTraversalPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', reason: 'Path traversal', severity: 'high' };
    }
  }

  for (const pattern of characterPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', reason: 'Dangerous characters', severity: 'high' };
    }
  }

  if (config.blockSuspiciousChars && config.suspiciousChars.test(sanitized)) {
    return { isValid: false, sanitized: '', reason: 'Suspicious chars', severity: 'medium' };
  }

  if (/(.)\1{15,}/.test(sanitized)) {
    return { isValid: false, sanitized: '', reason: 'Char repetition', severity: 'medium' };
  }

  if (/^\d{10,}$/.test(sanitized) && usageType === 'search') {
    return { isValid: false, sanitized: '', reason: 'Numeric pattern', severity: 'medium' };
  }

  const suspiciousStructures = [
    /\[.*\]/,
    /\{.*\}/,
    /\(.*\|.*\)/,
    /["'][^"']*["']\s*[=<>!]+/,
    /\+.*\*/,
    /\*.*\+/,
    /\|\|.*\&\&/,
    /\&\&.*\|\|/,
    /[()]{3,}/,
    /[[\]]{3,}/,
    /[{}]{3,}/
  ];

  if (usageType === 'search' || usageType === 'username' || usageType === 'filename') {
    for (const pattern of suspiciousStructures) {
      if (pattern.test(sanitized)) {
        return { isValid: false, sanitized: '', reason: 'Suspicious structure', severity: 'medium' };
      }
    }
  }

  if (config.normalizeWhitespace) {
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
  }

  if (config.toLowerCase) {
    sanitized = sanitized.toLowerCase();
  }

  if (sanitized.length === 0) {
    return { isValid: false, sanitized: '', reason: 'Empty after clean', severity: 'low' };
  }

  if (config.customValidation && !config.customValidation(sanitized)) {
    return { isValid: false, sanitized: '', reason: 'Custom validation', severity: 'medium' };
  }

  const finalClean = sanitized
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (finalClean !== sanitized && (usageType === 'search' || usageType === 'username')) {
    return { isValid: false, sanitized: '', reason: 'Contains hidden chars', severity: 'medium' };
  }

  return { isValid: true, sanitized: finalClean, severity: 'low' };
};

const getConfigForType = (usageType: UsageType) => {
  const configs = {
    search: {
      minLength: 1,
      maxLength: 200,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\]();='"\\\/!@#$%^&*|`~]/,
      normalizeWhitespace: true,
      toLowerCase: true,
      customValidation: (str: string) => !/^[0-9\s\-_.,]*$/.test(str) || str.replace(/[0-9\s\-_.,]/g, '').length > 0
    },
    comment: {
      minLength: 1,
      maxLength: 5000,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\];\\]/,
      normalizeWhitespace: false,
      toLowerCase: false,
      customValidation: null
    },
    message: {
      minLength: 1,
      maxLength: 2000,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\];\\]/,
      normalizeWhitespace: false,
      toLowerCase: false,
      customValidation: null
    },
    title: {
      minLength: 1,
      maxLength: 150,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\];=\\\/]/,
      normalizeWhitespace: true,
      toLowerCase: false,
      customValidation: null
    },
    description: {
      minLength: 1,
      maxLength: 1000,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\];=\\\/]/,
      normalizeWhitespace: false,
      toLowerCase: false,
      customValidation: null
    },
    username: {
      minLength: 2,
      maxLength: 50,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\]();='"\\\/\s!@#$%^&*|`~]/,
      normalizeWhitespace: true,
      toLowerCase: true,
      customValidation: (str: string) => /^[a-z0-9._-]+$/.test(str)
    },
    email: {
      minLength: 5,
      maxLength: 254,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\]();='"\\\/\s]/,
      normalizeWhitespace: true,
      toLowerCase: true,
      customValidation: (str: string) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(str)
    },
    url: {
      minLength: 7,
      maxLength: 2048,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\]();'"\\]/,
      normalizeWhitespace: true,
      toLowerCase: true,
      customValidation: (str: string) => /^https?:\/\/[a-z0-9.-]+[a-z0-9\/_?&=.-]*$/i.test(str)
    },
    filename: {
      minLength: 1,
      maxLength: 255,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>:"|?*\\\/]/,
      normalizeWhitespace: true,
      toLowerCase: false,
      customValidation: (str: string) => !/^\.+$/.test(str) && !/[<>:"|?*\\\/]/.test(str)
    },
    tag: {
      minLength: 1,
      maxLength: 50,
      blockSuspiciousChars: true,
      suspiciousChars: /[<>{}[\]();='"\\\/\s]/,
      normalizeWhitespace: true,
      toLowerCase: true,
      customValidation: (str: string) => /^[a-z0-9._-]+$/.test(str)
    }
  };

  return configs[usageType] || configs.comment;
};

export { universalSanitizer, type SanitizeResult, type UsageType };