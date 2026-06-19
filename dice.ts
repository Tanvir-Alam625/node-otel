import { trace, type Span } from "@opentelemetry/api";


const tracer = trace.getTracer('dice-lib');

const rollOnce = (index: number, min: number, max: number): number => {
    return tracer.startActiveSpan(`rollDice:${index}`, (span: Span) => {
        const result = Math.floor(Math.random() * (max - min) + min);

        // add an attribute to the span
        span.setAttribute('dicelib.rolled', result.toString());

        span.end();
        return result;
    })
}


export const rollTheDice = (rolls: number, min: number, max: number) => {
    return tracer.startActiveSpan('rollTheDice',
        {
            attributes: {
                'dicelib.rolls': rolls.toString()
            }
        },
        (span: Span) => {
            const results: number[] = [];

            for (let i = 0; i < rolls; i++) {
                results.push(rollOnce(i, min, max));
            }

            span.end();
            return results;
        })
}