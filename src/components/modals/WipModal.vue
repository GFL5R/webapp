<template>
  <teleport to="body">
    <div class="wip-overlay" @click.self="$emit('close')">
      <div class="wip-modal">
        <div class="wip-modal__header">
          <span class="wip-modal__icon">⚠</span>
          <span class="wip-modal__title">NOTICE: WORK IN PROGRESS</span>
        </div>
        <div class="wip-modal__body">
          <p>This field manual is <strong>not yet complete</strong>. The following should be kept in mind:</p>
          <ul>
            <li>Rules are <strong>not final</strong> and are subject to change at any time.</li>
            <li>Techniques and Peculiarities (Advantages &amp; Passions) are <strong>still being added</strong>.</li>
            <li>Some pages may be incomplete, missing, or contain placeholder content.</li>
            <li>Balance has not been fully playtested. <strong>Expect rough edges.</strong></li>
          </ul>
          <p class="wip-modal__sub">You are viewing an early draft. All content is provisional.</p>
        </div>
        <div class="wip-modal__footer">
          <button class="wip-modal__dismiss" @click="$emit('close')">ACKNOWLEDGED — PROCEED</button>
        </div>
        <div class="wip-modal__corner wip-modal__corner--tl"></div>
        <div class="wip-modal__corner wip-modal__corner--tr"></div>
        <div class="wip-modal__corner wip-modal__corner--bl"></div>
        <div class="wip-modal__corner wip-modal__corner--br"></div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.wip-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 10, 18, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  backdrop-filter: blur(3px);
}

.wip-modal {
  position: relative;
  background: var(--panel);
  border: 1px solid var(--morpho);
  box-shadow: 0 0 40px rgba(255, 145, 0, 0.2), inset 0 0 40px rgba(255, 145, 0, 0.03);
  max-width: 560px;
  width: calc(100% - 2rem);
  padding: 2rem;
}

.wip-modal__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 145, 0, 0.25);
}

.wip-modal__icon {
  font-size: 1.4rem;
  color: var(--morpho);
  line-height: 1;
}

.wip-modal__title {
  font-family: var(--font-disp);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--morpho);
}

.wip-modal__body {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--ink-dim);
  line-height: 1.7;
}

.wip-modal__body p {
  margin-bottom: 0.75rem;
}

.wip-modal__body strong {
  color: var(--ink);
}

.wip-modal__body ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.wip-modal__body ul li {
  padding-left: 1.25rem;
  position: relative;
}

.wip-modal__body ul li::before {
  content: '◆';
  position: absolute;
  left: 0;
  color: rgba(255, 145, 0, 0.45);
  font-size: 0.55rem;
  top: 0.35em;
}

.wip-modal__sub {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--ink-faint);
  letter-spacing: 0.5px;
  margin-top: 0.5rem;
}

.wip-modal__footer {
  margin-top: 1.5rem;
  text-align: center;
}

.wip-modal__dismiss {
  font-family: var(--font-disp);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--bg);
  background: var(--morpho);
  border: none;
  padding: 0.6rem 2rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}

.wip-modal__dismiss:hover {
  background: var(--cyan);
  box-shadow: 0 0 16px var(--morpho);
}

.wip-modal__corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: var(--morpho);
  border-style: solid;
}

.wip-modal__corner--tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
.wip-modal__corner--tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
.wip-modal__corner--bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
.wip-modal__corner--br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }
</style>