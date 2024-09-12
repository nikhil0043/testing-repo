import {connect} from '@/dbConfig/dbConfig';
import ContentPost from '@/models/contentModel';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { content} = reqBody;
        
        console.log(content);

        const createContent = new ContentPost({
            content
        });
        const savedPost = await createContent.save();
        
        if(!savedPost){
            return NextResponse.json({error: 'Unable to create post'}, {status: 400});
        }
        const allpost = await ContentPost.find({}, null, { sort: { createdAt: -1 } });

        return NextResponse.json({message: 'Post saved successfully', allpost}, {status: 200},);

    } catch (error: any) {
        return NextResponse.json( {error: error.message}, {status: 500});
    }
}