export async function fetchBoard (boardId) {
	const res = await fetch(`/api/boards/${boardId}`);
	if (!res.ok) throw new Error("Failed to load board");
	return await res.json();
}
