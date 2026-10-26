
import { createHash, createHmac } from "node:crypto";

const hashExternalId = (sessionId) => {
    if (!sessionId || typeof sessionId !== "string") return null;

    const secret = process.env.META_EXTERNAL_ID_SECRET;

    if (!secret) return null;

    return createHmac("sha256", secret)
        .update(sessionId)
        .digest("hex");
};

const hashEmail = (email) => {
    if (!email || typeof email !== "string") return null;

    const normalized = email.trim().toLowerCase();
    if (!normalized) return null;

    return createHash("sha256")
        .update(normalized)
        .digest("hex");
};


const hashPhone = (phone) => {
    if (!phone || typeof phone !== "string") return null;

    let normalized = phone.replace(/\D/g, "");

    if (normalized.length === 10) {
        normalized = `1${normalized}`;
    }

    if (!/^\d{11}$/.test(normalized) || !normalized.startsWith("1")) {
        return null;
    }

    return createHash("sha256")
        .update(normalized)
        .digest("hex");
};


export const sendMetaEvent = async ({
    eventName,
    eventId,
    sessionId,
    email,
    phone,
    value,
    currency = "USD",
    contentIds = [],
    contentName,
    clientIp,
    userAgent,
    eventSourceUrl,
    fbp,
    fbc,
}) => {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
        console.warn("Meta CAPI is not configured");
        return;
    }

    const emailHash = hashEmail(email);
    const phoneHash = hashPhone(phone);
    const externalId = hashExternalId(sessionId);

    const userData = {
        ...(emailHash ? { em: [emailHash] } : {}),
        ...(phoneHash ? { ph: [phoneHash] } : {}),
        ...(externalId ? { external_id: [externalId] } : {}),
        ...(clientIp ? { client_ip_address: clientIp } : {}),
        ...(userAgent ? { client_user_agent: userAgent } : {}),
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {}),
    };

    if (Object.keys(userData).length === 0) {
        console.warn("Meta CAPI: no matching data available");
        return;
    }

    const event = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        user_data: userData,
        ...(eventSourceUrl
            ? { event_source_url: eventSourceUrl }
            : {}),
        custom_data: {
            currency,
            value: Number(value),
            ...(contentIds.length > 0
                ? {
                    content_ids: contentIds.map(String),
                    content_type: "product",
                }
                : {}),
            ...(contentName ? { content_name: contentName } : {}),
        },
    };

    const payload = {
        data: [event],
        ...(process.env.META_TEST_EVENT_CODE
            ? { test_event_code: process.env.META_TEST_EVENT_CODE }
            : {}),
    };

    const apiVersion = process.env.META_API_VERSION;

    if (!apiVersion) {
        console.warn("Meta CAPI API version is missing");
        return;
    }

    const response = await fetch(
        `https://graph.facebook.com/${apiVersion}/${pixelId}/events`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(8000),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            `Meta CAPI error: ${JSON.stringify(result)}`
        );
    }

    console.log("META CAPI EVENT SENT:", {
        eventName,
        eventId,
        eventsReceived: result.events_received,
    });


    return result;
};
