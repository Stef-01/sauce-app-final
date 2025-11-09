import { supabase, DBProject, DBPostTemplate, DBPost, DBComment } from './supabaseClient';
import { Project, Article, Wisdom, Post, Comment, CommunityCard, UserProfile, NetworkNode, NetworkEdge } from '../types';

export async function fetchProjects(): Promise<Project[]> {
    try {
        console.log('🔄 Fetching projects from Supabase...');
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('posted_at', { ascending: false });

        if (error) {
            console.error('❌ Error fetching projects:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            return [];
        }

        if (!data) {
            console.warn('⚠️ No data returned from Supabase');
            return [];
        }

        console.log(`✅ Successfully fetched ${data.length} projects`);

        return (data as DBProject[]).map(dbProject => ({
            id: dbProject.project_id,
            title: dbProject.project_title,
            company: dbProject.company_name,
            logo: dbProject.logo || `https://i.pravatar.cc/100?u=${dbProject.project_id}`,
            location: dbProject.location || 'Location TBD',
            isRemote: dbProject.is_remote,
            postedAt: formatPostedAt(dbProject.posted_at),
            description: dbProject.brief || '',
            technicalRequirements: dbProject.required_skills?.join(', '),
            skillsRequired: dbProject.required_skills || [],
            estimatedDuration: dbProject.duration_weeks ? `${dbProject.duration_weeks} weeks` : undefined,
            projectScope: dbProject.objectives?.join(' ') || undefined,
        }));
    } catch (err) {
        console.error('Exception fetching projects:', err);
        return [];
    }
}

export async function createProject(project: Omit<Project, 'id' | 'postedAt'>): Promise<Project> {
    const dbProject = {
        company_name: project.company,
        project_title: project.title,
        brief: project.description,
        location: project.location,
        is_remote: project.isRemote,
        logo: project.logo,
        required_skills: project.skillsRequired || [],
        objectives: project.projectScope ? [project.projectScope] : [],
    };

    const { data, error } = await supabase
        .from('projects')
        .insert([dbProject])
        .select()
        .single();

    if (error) {
        console.error('Error creating project:', error);
        throw new Error('Failed to create project');
    }

    const created = data as DBProject;
    return {
        id: created.project_id,
        title: created.project_title,
        company: created.company_name,
        logo: created.logo || `https://i.pravatar.cc/100?u=${created.project_id}`,
        location: created.location || 'Location TBD',
        isRemote: created.is_remote,
        postedAt: formatPostedAt(created.posted_at),
        description: created.brief || '',
        skillsRequired: created.required_skills || [],
    };
}

export async function fetchPostTemplatesByCategory(categoryName: string): Promise<DBPostTemplate[]> {
    const { data: categories, error: catError } = await supabase
        .from('post_categories')
        .select('id')
        .eq('name', categoryName)
        .single();

    if (catError || !categories) {
        console.error('Error fetching category:', catError);
        return [];
    }

    const { data, error } = await supabase
        .from('post_templates')
        .select('*')
        .eq('category_id', categories.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching post templates:', error);
        return [];
    }

    return data as DBPostTemplate[];
}

export async function fetchAllPostTemplates(): Promise<DBPostTemplate[]> {
    try {
        console.log('🔄 Fetching post templates from Supabase...');
        const { data, error } = await supabase
            .from('post_templates')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Error fetching post templates:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            return [];
        }

        console.log(`✅ Successfully fetched ${data?.length || 0} post templates`);
        return (data || []) as DBPostTemplate[];
    } catch (err) {
        console.error('❌ Exception fetching post templates:', err);
        return [];
    }
}

export function convertTemplateToArticle(template: DBPostTemplate): Article {
    return {
        id: template.id,
        title: template.title,
        summary: template.body_template,
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + template.id}?q=80&w=870&auto=format&fit=crop`,
        link: '#',
        source: getCategoryDisplayName(template.category_id),
        publishedAt: new Date(template.created_at).toISOString().split('T')[0],
    };
}

export function convertTemplateToWisdom(template: DBPostTemplate): Wisdom {
    return {
        id: template.id,
        quote: template.body_template,
        author: template.tone || 'Community',
    };
}

export function formatPostedAt(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

function getCategoryDisplayName(categoryId: number): string {
    const categories: Record<number, string> = {
        1: 'General',
        2: 'Alumni Insights',
        3: 'Essays',
    };
    return categories[categoryId] || 'General';
}

// Fetch posts by category
export async function fetchPostsByCategory(categoryName: string): Promise<Post[]> {
    try {
        console.log(`🔄 Fetching posts for category: ${categoryName}`);
        
        // Get category ID
        const { data: category, error: catError } = await supabase
            .from('post_categories')
            .select('id, name')
            .eq('name', categoryName)
            .single();

        if (catError || !category) {
            console.error('❌ Error fetching category:', catError);
            return [];
        }

        // Fetch posts with category info
        const { data: posts, error: postsError } = await supabase
            .from('posts')
            .select('*')
            .eq('category_id', category.id)
            .order('created_at', { ascending: false });

        if (postsError) {
            console.error('❌ Error fetching posts:', postsError);
            return [];
        }

        // Get comment counts
        const postIds = posts?.map(p => p.id) || [];
        const { data: commentCounts } = await supabase
            .from('comments')
            .select('post_id')
            .in('post_id', postIds);

        const countsMap = new Map<number, number>();
        commentCounts?.forEach(c => {
            countsMap.set(c.post_id, (countsMap.get(c.post_id) || 0) + 1);
        });

        // Get author info for posts that have authors
        const authorIds = [...new Set((posts || []).map((p: any) => p.author_id).filter(Boolean))];
        let authorMap = new Map();
        
        if (authorIds.length > 0) {
            const { data: authors } = await supabase
                .from('user_profiles')
                .select('user_id, full_name')
                .in('user_id', authorIds);
            
            authors?.forEach((author: any) => {
                authorMap.set(author.user_id, author.full_name);
            });
        }

        // Transform to Post format
        const transformedPosts: Post[] = (posts || []).map((post: any) => ({
            id: post.id,
            university_id: post.university_id,
            author_id: post.author_id,
            author_name: post.author_id ? (authorMap.get(post.author_id) || 'Anonymous') : 'Community',
            author_avatar: `https://i.pravatar.cc/100?u=${post.author_id || post.id}`,
            body: post.body,
            media_url: post.media_url,
            score: post.score,
            category_id: post.category_id,
            category_name: categoryName,
            template_id: post.template_id,
            created_at: post.created_at,
            updated_at: post.updated_at,
            user_vote: 0, // TODO: Get user vote if authenticated
            comment_count: countsMap.get(post.id) || 0,
        }));

        console.log(`✅ Fetched ${transformedPosts.length} posts for ${categoryName}`);
        return transformedPosts;
    } catch (err) {
        console.error('❌ Exception fetching posts:', err);
        return [];
    }
}

// Fetch all posts
export async function fetchAllPosts(): Promise<Post[]> {
    try {
        console.log('🔄 Fetching all posts...');
        
        const { data: posts, error: postsError } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (postsError) {
            console.error('❌ Error fetching posts:', postsError);
            return [];
        }

        // Get comment counts
        const postIds = posts?.map(p => p.id) || [];
        const { data: commentCounts } = await supabase
            .from('comments')
            .select('post_id')
            .in('post_id', postIds);

        const countsMap = new Map<number, number>();
        commentCounts?.forEach(c => {
            countsMap.set(c.post_id, (countsMap.get(c.post_id) || 0) + 1);
        });

        // Get category names
        const categoryIds = [...new Set((posts || []).map((p: any) => p.category_id).filter(Boolean))];
        let categoryMap = new Map();
        
        if (categoryIds.length > 0) {
            const { data: categories } = await supabase
                .from('post_categories')
                .select('id, name')
                .in('id', categoryIds);
            
            categories?.forEach((cat: any) => {
                categoryMap.set(cat.id, cat.name);
            });
        }

        // Get author info
        const authorIds = [...new Set((posts || []).map((p: any) => p.author_id).filter(Boolean))];
        let authorMap = new Map();
        
        if (authorIds.length > 0) {
            const { data: authors } = await supabase
                .from('user_profiles')
                .select('user_id, full_name')
                .in('user_id', authorIds);
            
            authors?.forEach((author: any) => {
                authorMap.set(author.user_id, author.full_name);
            });
        }

        const transformedPosts: Post[] = (posts || []).map((post: any) => ({
            id: post.id,
            university_id: post.university_id,
            author_id: post.author_id,
            author_name: post.author_id ? (authorMap.get(post.author_id) || 'Anonymous') : 'Community',
            author_avatar: `https://i.pravatar.cc/100?u=${post.author_id || post.id}`,
            body: post.body,
            media_url: post.media_url,
            score: post.score,
            category_id: post.category_id,
            category_name: post.category_id ? (categoryMap.get(post.category_id) || 'General') : 'General',
            template_id: post.template_id,
            created_at: post.created_at,
            updated_at: post.updated_at,
            user_vote: 0,
            comment_count: countsMap.get(post.id) || 0,
        }));

        console.log(`✅ Fetched ${transformedPosts.length} posts`);
        return transformedPosts;
    } catch (err) {
        console.error('❌ Exception fetching all posts:', err);
        return [];
    }
}

// Fetch comments for a post
export async function fetchCommentsForPost(postId: number): Promise<Comment[]> {
    try {
        const { data: comments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId)
            .is('parent_comment_id', null) // Only top-level comments
            .order('score', { ascending: false })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Error fetching comments:', error);
            return [];
        }

        // Get author info for comments
        const commentAuthorIds = [...new Set((comments || []).map((c: any) => c.author_id).filter(Boolean))];
        let commentAuthorMap = new Map();
        
        if (commentAuthorIds.length > 0) {
            const { data: commentAuthors } = await supabase
                .from('user_profiles')
                .select('user_id, full_name')
                .in('user_id', commentAuthorIds);
            
            commentAuthors?.forEach((author: any) => {
                commentAuthorMap.set(author.user_id, author.full_name);
            });
        }

        const transformedComments: Comment[] = (comments || []).map((comment: any) => ({
            id: comment.id,
            post_id: comment.post_id,
            author_id: comment.author_id,
            author_name: comment.author_id ? (commentAuthorMap.get(comment.author_id) || 'Anonymous') : 'Anonymous',
            author_avatar: `https://i.pravatar.cc/100?u=${comment.author_id || comment.id}`,
            body: comment.body,
            media_url: comment.media_url,
            score: comment.score,
            parent_comment_id: comment.parent_comment_id,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
            user_vote: 0,
            replies: [],
        }));

        return transformedComments;
    } catch (err) {
        console.error('❌ Exception fetching comments:', err);
        return [];
    }
}

// Vote on a post
export async function voteOnPost(postId: number, direction: number, userId?: number): Promise<boolean> {
    try {
        if (!userId) {
            console.warn('⚠️ Cannot vote: user not authenticated');
            return false;
        }

        // Upsert vote
        const { error } = await supabase
            .from('votes')
            .upsert({
                user_id: userId,
                post_id: postId,
                direction: direction,
            }, {
                onConflict: 'user_id,post_id'
            });

        if (error) {
            console.error('❌ Error voting on post:', error);
            return false;
        }

        console.log(`✅ Voted on post ${postId} with direction ${direction}`);
        return true;
    } catch (err) {
        console.error('❌ Exception voting on post:', err);
        return false;
    }
}

// Create a comment
export async function createComment(postId: number, body: string, authorId?: number, parentCommentId?: number): Promise<Comment | null> {
    try {
        const { data, error } = await supabase
            .from('comments')
            .insert({
                post_id: postId,
                author_id: authorId || null,
                body: body,
                parent_comment_id: parentCommentId || null,
            })
            .select('*')
            .single();

        if (error) {
            console.error('❌ Error creating comment:', error);
            return null;
        }

        // Get author name if author_id exists
        let authorName = 'Anonymous';
        if (data.author_id) {
            const { data: author } = await supabase
                .from('user_profiles')
                .select('full_name')
                .eq('user_id', data.author_id)
                .single();
            authorName = author?.full_name || 'Anonymous';
        }

        const comment: Comment = {
            id: data.id,
            post_id: data.post_id,
            author_id: data.author_id,
            author_name: authorName,
            author_avatar: `https://i.pravatar.cc/100?u=${data.author_id || data.id}`,
            body: data.body,
            media_url: data.media_url,
            score: data.score,
            parent_comment_id: data.parent_comment_id,
            created_at: data.created_at,
            updated_at: data.updated_at,
            user_vote: 0,
            replies: [],
        };

        console.log(`✅ Created comment ${comment.id}`);
        return comment;
    } catch (err) {
        console.error('❌ Exception creating comment:', err);
        return null;
    }
}

// Fetch community cards for Elevate (swipeable profiles)
export async function fetchCommunityCards(excludeUserId?: number): Promise<CommunityCard[]> {
    try {
        console.log('🔄 Fetching community cards...');
        
        let query = supabase
            .from('community_cards')
            .select('*')
            .eq('visible_in_swipe', true);

        if (excludeUserId) {
            query = query.neq('user_id', excludeUserId);
        }

        const { data: cards, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Error fetching community cards:', error);
            return [];
        }

        // Get extended user profile data
        const userIds = [...new Set((cards || []).map((c: any) => c.user_id))];
        const { data: profiles } = await supabase
            .from('user_profiles')
            .select('*')
            .in('user_id', userIds);

        const { data: alumniDetails } = await supabase
            .from('alumni_details')
            .select('*')
            .in('user_id', userIds);

        const profileMap = new Map();
        profiles?.forEach((p: any) => {
            profileMap.set(p.user_id, p);
        });

        const alumniMap = new Map();
        alumniDetails?.forEach((a: any) => {
            alumniMap.set(a.user_id, a);
        });

        // Transform to CommunityCard format
        const transformedCards: CommunityCard[] = (cards || []).map((card: any) => {
            const profile = profileMap.get(card.user_id);
            const alumni = alumniMap.get(card.user_id);
            
            return {
                id: card.id,
                user_id: card.user_id,
                title: card.title,
                subtitle: card.subtitle,
                company: card.company || profile?.current_company,
                role_label: card.role_label || profile?.current_title,
                tags: card.tags || [],
                is_alumni: card.is_alumni,
                is_student: card.is_student,
                visible_in_swipe: card.visible_in_swipe,
                created_at: card.created_at,
                full_name: profile?.full_name,
                headline: profile?.headline,
                current_title: profile?.current_title,
                current_company: profile?.current_company,
                seeking_roles: profile?.seeking_roles || [],
                skill_tags: profile?.skill_tags || [],
                grad_year: profile?.grad_year,
                location: profile?.location,
                willing_to_mentor: alumni?.willing_to_mentor,
                open_to_projects: alumni?.open_to_projects,
                years_experience: alumni?.years_experience,
                industries: alumni?.industries || [],
            };
        });

        console.log(`✅ Fetched ${transformedCards.length} community cards`);
        return transformedCards;
    } catch (err) {
        console.error('❌ Exception fetching community cards:', err);
        return [];
    }
}

// Record a swipe (like or pass)
export async function recordSwipe(swiperUserId: number, targetUserId: number, direction: 'like' | 'pass'): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('community_swipes')
            .insert({
                swiper_user_id: swiperUserId,
                target_user_id: targetUserId,
                direction: direction,
            });

        if (error) {
            console.error('❌ Error recording swipe:', error);
            return false;
        }

        console.log(`✅ Recorded swipe: ${swiperUserId} ${direction} ${targetUserId}`);
        return true;
    } catch (err) {
        console.error('❌ Exception recording swipe:', err);
        return false;
    }
}

// Get suggested connections (AI-ranked)
export async function getSuggestedConnections(userId: number, limit: number = 10): Promise<CommunityCard[]> {
    try {
        // For now, return cards sorted by relevance (can be enhanced with AI ranking)
        // This is a placeholder - in production, you'd use AI to rank based on:
        // - Resume similarity
        // - Skills overlap
        // - Target roles match
        // - Shared context (school, program, interests)
        
        const { data: suggestions } = await supabase
            .from('suggested_connections')
            .select('suggested_user_id, score')
            .eq('user_id', userId)
            .order('score', { ascending: false })
            .limit(limit);

        if (!suggestions || suggestions.length === 0) {
            // If no AI suggestions, return random cards
            return await fetchCommunityCards(userId);
        }

        const suggestedUserIds = suggestions.map(s => s.suggested_user_id);
        const allCards = await fetchCommunityCards(userId);
        
        // Sort by suggestion score
        const cardMap = new Map(allCards.map(c => [c.user_id, c]));
        const sortedCards = suggestedUserIds
            .map(id => cardMap.get(id))
            .filter(Boolean) as CommunityCard[];

        return sortedCards;
    } catch (err) {
        console.error('❌ Exception getting suggested connections:', err);
        return await fetchCommunityCards(userId);
    }
}

// Fetch network data for Network Map
export async function fetchNetworkData(): Promise<{ nodes: NetworkNode[]; edges: NetworkEdge[] }> {
    try {
        console.log('🔄 Fetching network data...');

        // Get companies and their alumni
        const { data: companyData, error: companyError } = await supabase
            .from('user_profiles')
            .select('current_company, user_id, full_name')
            .not('current_company', 'is', null);

        if (companyError) {
            console.error('❌ Error fetching company data:', companyError);
            return { nodes: [], edges: [] };
        }

        // Group by company
        const companyMap = new Map<string, { alumni: string[]; userIds: number[] }>();
        companyData?.forEach((item: any) => {
            if (!item.current_company) return;
            
            if (!companyMap.has(item.current_company)) {
                companyMap.set(item.current_company, { alumni: [], userIds: [] });
            }
            
            const company = companyMap.get(item.current_company)!;
            company.alumni.push(item.full_name || `User ${item.user_id}`);
            company.userIds.push(item.user_id);
        });

        // Create nodes
        const nodes: NetworkNode[] = [];
        const nodeIds = new Set<string>();

        // Add company nodes
        companyMap.forEach((data, companyName) => {
            const nodeId = `company-${companyName}`;
            nodeIds.add(nodeId);
            nodes.push({
                id: nodeId,
                label: companyName,
                type: 'company',
                company: companyName,
                alumni_count: data.alumni.length,
                alumni_names: data.alumni,
            });
        });

        // Add alumni nodes (simplified - can be expanded)
        // For now, we'll just show companies with alumni counts
        // In a full implementation, you might want individual alumni nodes

        // Create edges (company to company based on shared alumni, or alumni to companies)
        const edges: NetworkEdge[] = [];
        
        // For a simple visualization, we can create edges between companies that share alumni
        // or create edges from a central node to companies
        // For now, let's create a simple star graph with a central "Stanford" node

        const stanfordNode: NetworkNode = {
            id: 'stanford',
            label: 'Stanford University',
            type: 'company',
        };
        nodes.unshift(stanfordNode);

        // Connect Stanford to each company
        companyMap.forEach((data, companyName) => {
            edges.push({
                source: 'stanford',
                target: `company-${companyName}`,
                value: data.alumni.length,
            });
        });

        console.log(`✅ Fetched network data: ${nodes.length} nodes, ${edges.length} edges`);
        return { nodes, edges };
    } catch (err) {
        console.error('❌ Exception fetching network data:', err);
        return { nodes: [], edges: [] };
    }
}
