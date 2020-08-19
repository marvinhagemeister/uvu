export function spy(cb = () => void 0) {
	const calls = [];
	const wrapped = function(...args) {
		const call = { args, return: undefined };
		calls.push(call);
		const res = cb.apply(this, args)

		if (res && typeof res.then === "function") {
			return res.then(r => {
				call.return = r;
				return r;
			})
		}

		call.return = res;
		return res;
	};
	wrapped.calls = calls;
	Object.defineProperty(wrapped, 'length', { value: cb.length });
	return wrapped;
}