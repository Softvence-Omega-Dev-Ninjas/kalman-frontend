import type { TradeFormState, ProfessionalInfo } from '@/redux/features/tradeForm/tradeFormSlice';

function dataUrlToBase64(dataUrl: string) {
  // data:[<mediatype>][;base64],<data>
  const parts = dataUrl.split(',');
  return parts.length > 1 ? parts[1] : parts[0];
}

function fileToBinaryObject(f: { name?: string; size?: number; type?: string; dataUrl?: string }) {
  if (!f?.dataUrl) return null;
  const b64 = dataUrlToBase64(f.dataUrl);
  return {
    filename: f.name,
    contentType: f.type,
    size: f.size,
    $binary: b64,
  };
}

export function tradePersonSignupFormData(tradeForm: TradeFormState) {
  const fd = new FormData();

  // Personal
  const p = tradeForm.personal || {};
  Object.entries(p).forEach(([k, v]) => {
    if (v !== undefined && v !== null) fd.append(`personal[${k}]`, String(v));
  });

  // Professional simple fields
  const r: ProfessionalInfo = tradeForm.professional || {};
  Object.entries(r).forEach(([k, v]) => {
    if (k === 'idFiles' || k === 'credentialsFiles') return;
    if (k === 'serviceAreaCenter' && typeof v === 'object' && v !== null) {
      const svc = v as ProfessionalInfo['serviceAreaCenter'];
      if (svc?.lat !== undefined) fd.append('professional[serviceArea][lat]', String(svc.lat));
      if (svc?.lng !== undefined) fd.append('professional[serviceArea][lng]', String(svc.lng));
      if (svc?.address) fd.append('professional[serviceArea][address]', String(svc.address));
      return;
    }
    if (v !== undefined && v !== null) fd.append(`professional[${k}]`, Array.isArray(v) ? JSON.stringify(v) : String(v));
  });

  // Files: idFiles
  const idFiles = r.idFiles as Array<{ dataUrl?: string; name?: string; type?: string; size?: number }> | undefined;
  if (idFiles && idFiles.length) {
    idFiles.forEach((f, i) => {
      const obj = fileToBinaryObject(f);
      if (obj) fd.append(`professional[idFiles][${i}]`, JSON.stringify(obj));
    });
  }

  // credentialsFiles
  const cred = r.credentialsFiles as Array<{ dataUrl?: string; name?: string; type?: string; size?: number }> | undefined;
  if (cred && cred.length) {
    cred.forEach((f, i) => {
      const obj = fileToBinaryObject(f);
      if (obj) fd.append(`professional[credentialsFiles][${i}]`, JSON.stringify(obj));
    });
  }

  return fd;
}

export default tradePersonSignupFormData;
