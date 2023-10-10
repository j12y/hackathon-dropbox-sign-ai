import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import { HfInference } from '@huggingface/inference';
const hf = new HfInference(env.HUGGINGFACE_HUB_API_KEY);

const retryPrompt = async(answer, limit = 5) => {
	if (limit < 1) { return answer; }

	// console.log(answer);
	let update = await hf.textGeneration({
		model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
		inputs: answer
	});

	if (update.generated_text === answer.generated_text) {
		return answer;
	}

	limit--;
	return retryPrompt(update.generated_text, limit);
}


export async function GET({ url }) {
	const asset = url.searchParams.get('asset');
	// const prompt = `<|prompter|>Create an example section of a will leaving my ${asset} to my named beneficiaries <|endoftext|><|assistant|>`;
	const prompt = `<|prompter|>Describe how to divide ${asset} among a number of previous two named beneficiaries fairly <|endoftext|><|assistant|>`;

	const result = await retryPrompt(prompt);
	return json({
		'result': result.split('<|assistant|>')[1]
	});
}
