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
  let wasUrlEncoded = false;

  try {
    // Check if the input was URL encoded
    const decoded = decodeURIComponent(data);
    wasUrlEncoded = decoded !== data;

    // Decode HTML entities first, then URL decode
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

  // Critical MongoDB injection patterns - more precise matching
  const criticalPatterns = [
    /\$where\s*[:=]/i, /\$ne\s*[:=]/i, /\$gt\s*[:=]/i, /\$gte\s*[:=]/i, /\$lt\s*[:=]/i, /\$lte\s*[:=]/i,
    /\$in\s*[:=]/i, /\$nin\s*[:=]/i, /\$or\s*[:=]/i, /\$and\s*[:=]/i, /\$not\s*[:=]/i, /\$nor\s*[:=]/i,
    /\$exists\s*[:=]/i, /\$type\s*[:=]/i, /\$mod\s*[:=]/i, /\$regex\s*[:=]/i, /\$options\s*[:=]/i,
    /\$elemMatch\s*[:=]/i, /\$size\s*[:=]/i, /\$all\s*[:=]/i, /\$slice\s*[:=]/i,
    /\$match\s*[:=]/i, /\$group\s*[:=]/i, /\$project\s*[:=]/i, /\$lookup\s*[:=]/i,
    // SQL injection patterns
    /;\s*(drop|delete|update|insert|alter|create|truncate|replace)\s+/i,
    /\bunion\s+(all\s+)?select\b/i, /\b(and|or)\s+[\d'"]+\s*[=!<>]+\s*[\d'"]+/i,
    // Timing attacks
    /sleep\s*\(\s*\d+/i, /waitfor\s+delay/i, /pg_sleep\s*\(/i, /benchmark\s*\(/i,
    // System tables
    /information_schema/i, /mysql\./i, /sys\./i, /pg_catalog/i,
    // Dangerous SQL functions
    /xp_cmdshell/i, /sp_executesql/i, /exec\s*\(/i,
    // SQL comments
    /-{2,}/, /\/\*[\s\S]*?\*\//, /#.*$/m,
    // JavaScript code execution
    /this\.\w+\s*\(/i, /function\s*\(/i, /=>\s*[{(]/i, /eval\s*\(/i,
    /setTimeout\s*\(/i, /setInterval\s*\(/i, /new\s+Function/i,
    // Command injection
    /[;&|`]\s*[a-z]/i, /\|\||\&\&/,
    /(nslookup|curl|wget|ping|nc|netcat|telnet)\s/i,
    // Script injection
    /response\.write/i, /document\.write/i, /window\./i, /alert\s*\(/i,
    // System commands
    /\b(cat|ls|dir|rm|del|copy|move|chmod|ps|kill|whoami|id|pwd)\s/i
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

  // More precise suspicious structure detection - only for non-search or when context suggests attack
  const suspiciousStructures = [
    // Only block structures that look like actual injection attempts
    /\{[^}]*\$\w+[^}]*\}/,  // MongoDB operators in objects
    /\[.*\$\w+.*\]/,        // MongoDB operators in arrays
    /\(.*\|.*\|.*\)/,       // Multiple pipes in parentheses (regex injection)
    /["'][^"']*["']\s*[=<>!]+/,  // String comparisons
    /\+.*\*/,               // Arithmetic expressions
    /\*.*\+/,               // Arithmetic expressions
    /\|\|.*\&\&/,           // Logic operators
    /\&\&.*\|\|/,           // Logic operators
    /[()]{4,}/,             // Excessive parentheses
    /[{}]{3,}/,             // Excessive braces
  ];

  // For search queries, be more lenient with brackets - only block if it looks like injection
  if (usageType === 'search') {
    // Only block brackets if they contain suspicious patterns
    const suspiciousInBrackets = [
      /\[[^\]]*\$\w+[^\]]*\]/,     // MongoDB operators in brackets
      /\[[^\]]*[=<>!]+[^\]]*\]/,   // Comparison operators in brackets
      /\[[^\]]*[;&|][^\]]*\]/,     // Command separators in brackets
    ];

    for (const pattern of suspiciousInBrackets) {
      if (pattern.test(sanitized)) {
        return { isValid: false, sanitized: '', reason: 'Suspicious structure', severity: 'medium' };
      }
    }
  } else if (usageType === 'username' || usageType === 'filename') {
    // For usernames and filenames, maintain strict structure checking
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
      // Removed brackets from suspicious chars for search - they're common in legitimate searches
      suspiciousChars: /[<>{}();='"\\\/!@#$%^&*|`~]/,
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